function convertPayload(payload, context) {
    // See: https://kb.treon.fi/knowledge_base/sensors/sensorjson/
    const {
        SensorNodeId: subjectExternalId,
        Type: type,
    } = payload;
    const timestamp = payload.Timestamp * 1000;

    if (subjectExternalId == null) {
        context.logError(`No valid subject external id: ${subjectExternalId}`);
        return;
    }

    if (type === "burst") {
        // not supported
        return;
    }

    if (timestamp == null) {
        context.logError(`No valid timestamp: ${timestamp}`);
        return;
    }

    parsePayloadWithOptionalFields(
        payload,
        context,
        subjectExternalId,
        timestamp
    );
    parsePayloadWithTemperatureField(
        payload,
        context,
        subjectExternalId,
        timestamp
    );
    if (type === "scalar") {
        parseScalarPayload(payload, context, subjectExternalId, timestamp);
    }
}

function parsePayloadWithTemperatureField(
    payload,
    context,
    subjectExternalId,
    timestamp
) {
    const { Temperature: temperature } = payload;
    if (temperature != null) {
        const ingestionId = `${subjectExternalId}\$Temperature`;
        context.addMeasurement(
            ingestionId,
            number(temperature),
            date(timestamp)
        );
    }
}

function parsePayloadWithOptionalFields(...args) {
    fields = [
        "Acceleration", // Single x,y,z acceleration value (JSON)
        "AirQuality", // Air quality index, volatile organic compounds
        "AirQualityStatic", // Slowly changing AirQuality (more hysteresis)
        "Ambient_light", // Lightning (lux)
        "BatteryAlert", // Battery alert (boolean). Note: only true-value is sent.
        "BatteryLevel", // Battery level (%).
        "BatteryVoltage", // Battery voltage (mV)
        "CO2Index", // CO2 equivalent index
        "Distance", // Distance reading
        "Hall", // Magnetic hall switch (boolean)
        "Humidity", // Air humidity (%)
        "IAQaccuracy", // Air quality sensor calibration status
        "IAQaccuracyStatic", // IAQ accuracy for AirQualityStatic
        "Movement", // Movement detected (boolean): acceleration was larger than a predefined value
        "Pressure", // Air pressure (hPa)
        "Temperature", // Temperature (C)
    ];
    for (const field in fields) {
        parseOptionalField(...args, field);
    }
}

function parseOptionalField(
    payload,
    context,
    subjectExternalId,
    timestamp,
    field
) {
    const { [field]: value } = payload;
    const ingestionId = `${subjectExternalId}\$${field}`;
    ingestIfValuePresent(context, ingestionId, value, timestamp);
}

function ingestIfValuePresent(context, ingestionId, value, date) {
    if (value != null) {
        context.addMeasurement(
            ingestionId,
            number(value),
            date(timestamp)
        );
    }
}

function parseScalarPayload(payload, context, subjectExternalId, timestamp) {
    const { Vibration: vibration } = payload;
    if (vibration != null) {
        const defaultScalar = 1 / 100;
        const scaledValues = {
            "V-P2P": defaultScalar,
            "A-P2P": defaultScalar,
            "V-RMS": defaultScalar,
            "A-RMS": defaultScalar,
            "V-Z2P": defaultScalar,
            "A-Z2P": defaultScalar,
            Kurtosis: defaultScalar,
            Crest: defaultScalar,
        };

        const filter = []; // nothing to filter
        // While V-P2P, V-P2P and V-RMS should be sent, we receive the following fields
        // These are assumed to be velocity
        const metricExternalIdMapping = {
            RMS: "V-RMS",
            P2P: "V-P2P",
            Z2P: "V-Z2P",
        };
        for (let [metricExternalId, directionalValue] of Object.entries(
            vibration
        )) {
            if (filter.includes(metricExternalId)) {
                continue;
            }
            // map certain external IDs to their correct values
            if (metricExternalId in metricExternalIdMapping) {
                metricExternalId = metricExternalIdMapping[metricExternalId];
            }
            const scalar = scaledValues[metricExternalId] ?? 1;
            const directions = unpackDirection(directionalValue, { scalar });
            for (const { direction, value } of directions) {
                const ingestionId = `${subjectExternalId}\$${metricExternalId}-${direction}`;
                context.addMeasurement(
                    ingestionId,
                    number(value),
                    date(timestamp)
                );
            }
        }
    }
}

function unpackDirection(obj, opts) {
    const { scalar = 1 } = opts;
    const { X, Y, Z } = obj;
    const directions = [];
    if (X != null) {
        directions.push({ direction: "X", value: X * scalar });
    }
    if (Y != null) {
        directions.push({ direction: "Y", value: Y * scalar });
    }
    if (Z != null) {
        directions.push({ direction: "Z", value: Z * scalar });
    }
    return directions;
}
