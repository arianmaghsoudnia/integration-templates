// Parameter mappings are sourced from the RUTX11 firmware documentation, which 
// — at the time of writing — provides the most comprehensive Modbus parameter map available.
// See https://wiki.teltonika-networks.com/view/RUTX11_Modbus#Get_Parameters for details and the
//  parameter ID reference used by this script.
const registerMap = {
    2: {
        requiredValue: "System uptime",
        registerAddress: 1,
        registerNumber: 2,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    4: {
        requiredValue: "Mobile signal strength (RSSI in dBm)",
        registerAddress: 3,
        registerNumber: 4,
        numberOfRegisters: 2,
        representation: "32 bit integer"
    },
    6: {
        requiredValue: "Temperature (in 0.1 °C)",
        registerAddress: 5,
        registerNumber: 6,
        numberOfRegisters: 2,
        representation: "32 bit integer"
    },
    8: {
        requiredValue: "System hostname",
        registerAddress: 7,
        registerNumber: 8,
        numberOfRegisters: 16,
        representation: "ASCII"
    },
    24: {
        requiredValue: "GSM operator name",
        registerAddress: 23,
        registerNumber: 24,
        numberOfRegisters: 16,
        representation: "ASCII"
    },
    40: {
        requiredValue: "Serial number",
        registerAddress: 39,
        registerNumber: 40,
        numberOfRegisters: 16,
        representation: "ASCII"
    },
    56: {
        requiredValue: "LAN MAC address",
        registerAddress: 55,
        registerNumber: 56,
        numberOfRegisters: 16,
        representation: "ASCII"
    },
    72: {
        requiredValue: "Device name",
        registerAddress: 71,
        registerNumber: 72,
        numberOfRegisters: 16,
        representation: "ASCII"
    },
    88: {
        requiredValue: "Active SIM card",
        registerAddress: 87,
        registerNumber: 88,
        numberOfRegisters: 16,
        representation: "ASCII"
    },
    104: {
        requiredValue: "Network registration info",
        registerAddress: 103,
        registerNumber: 104,
        numberOfRegisters: 16,
        representation: "ASCII"
    },
    120: {
        requiredValue: "Network type",
        registerAddress: 119,
        registerNumber: 120,
        numberOfRegisters: 16,
        representation: "ASCII"
    },
    140: {
        requiredValue: "WAN IP address",
        registerAddress: 139,
        registerNumber: 140,
        numberOfRegisters: 2,
        representation: "8 bit unsigned integer"
    },
    144: {
        requiredValue: "GPS latitude",
        registerAddress: 143,
        registerNumber: 144,
        numberOfRegisters: 2,
        representation: "32 bit float"
    },
    146: {
        requiredValue: "GPS longitude",
        registerAddress: 145,
        registerNumber: 146,
        numberOfRegisters: 2,
        representation: "32 bit float"
    },
    148: {
        requiredValue: "GPS fixed time",
        registerAddress: 147,
        registerNumber: 148,
        numberOfRegisters: 16,
        representation: "ASCII (YYYY-MM-DD hh:mm:ss)",
        note: "returns UTC datetime"
    },
    164: {
        requiredValue: "GPS datetime",
        registerAddress: 163,
        registerNumber: 164,
        numberOfRegisters: 16,
        representation: "ASCII (YYYY-MM-DD hh:mm:ss)",
        note: "returns formatted datetime, adjusted with systems timezone"
    },
    180: {
        requiredValue: "GPS speed",
        registerAddress: 179,
        registerNumber: 180,
        numberOfRegisters: 2,
        representation: "32 bit float"
    },
    182: {
        requiredValue: "GPS satellite count",
        registerAddress: 181,
        registerNumber: 182,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    184: {
        requiredValue: "GPS accuracy",
        registerAddress: 183,
        registerNumber: 184,
        numberOfRegisters: 2,
        representation: "32 bit float"
    },
    186: {
        requiredValue: "Mobile data received this day (SIM1)",
        registerAddress: 185,
        registerNumber: 186,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    188: {
        requiredValue: "Mobile data sent this day (SIM1)",
        registerAddress: 187,
        registerNumber: 188,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    190: {
        requiredValue: "Mobile data received this week (SIM1)",
        registerAddress: 189,
        registerNumber: 190,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    192: {
        requiredValue: "Mobile data sent this week (SIM1)",
        registerAddress: 191,
        registerNumber: 192,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    194: {
        requiredValue: "Mobile data received this month (SIM1)",
        registerAddress: 193,
        registerNumber: 194,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    196: {
        requiredValue: "Mobile data sent this month (SIM1)",
        registerAddress: 195,
        registerNumber: 196,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    198: {
        requiredValue: "Mobile data received last 24h (SIM1)",
        registerAddress: 197,
        registerNumber: 198,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    200: {
        requiredValue: "Mobile data sent last 24h (SIM1)",
        registerAddress: 199,
        registerNumber: 200,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    206: {
        requiredValue: "Active SIM card",
        registerAddress: 205,
        registerNumber: 206,
        numberOfRegisters: 1,
        representation: "16 bit unsigned integer",
        note: "Reading returns current sim card index"
    },
    293: {
        requiredValue: "Mobile data received last 7 days (SIM1)",
        registerAddress: 292,
        registerNumber: 293,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    295: {
        requiredValue: "Mobile data sent last 7 days (SIM1)",
        registerAddress: 294,
        registerNumber: 295,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    297: {
        requiredValue: "Mobile data received last 30 days (SIM1)",
        registerAddress: 296,
        registerNumber: 297,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    299: {
        requiredValue: "Mobile data sent last 30 days (SIM1)",
        registerAddress: 298,
        registerNumber: 299,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    301: {
        requiredValue: "Mobile data received this day (SIM2)",
        registerAddress: 300,
        registerNumber: 301,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    303: {
        requiredValue: "Mobile data sent this day (SIM2)",
        registerAddress: 302,
        registerNumber: 303,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    305: {
        requiredValue: "Mobile data received this week (SIM2)",
        registerAddress: 304,
        registerNumber: 305,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    307: {
        requiredValue: "Mobile data sent this week (SIM2)",
        registerAddress: 306,
        registerNumber: 307,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    309: {
        requiredValue: "Mobile data received this month (SIM2)",
        registerAddress: 308,
        registerNumber: 309,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    311: {
        requiredValue: "Mobile data sent this month (SIM2)",
        registerAddress: 310,
        registerNumber: 311,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    313: {
        requiredValue: "Mobile data received last 24h (SIM2)",
        registerAddress: 312,
        registerNumber: 313,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    315: {
        requiredValue: "Mobile data sent last 24h (SIM2)",
        registerAddress: 314,
        registerNumber: 315,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    317: {
        requiredValue: "Mobile data received last 7 days (SIM2)",
        registerAddress: 316,
        registerNumber: 317,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    319: {
        requiredValue: "Mobile data sent last 7 days (SIM2)",
        registerAddress: 318,
        registerNumber: 319,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    321: {
        requiredValue: "Mobile data received last 30 days (SIM2)",
        registerAddress: 320,
        registerNumber: 321,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    323: {
        requiredValue: "Mobile data sent last 30 days (SIM2)",
        registerAddress: 322,
        registerNumber: 323,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    325: {
        requiredValue: "Input (PIN3)",
        registerAddress: 324,
        registerNumber: 325,
        numberOfRegisters: 1,
        representation: "16 bit unsigned integer"
    },
    326: {
        requiredValue: "Output (PIN4)",
        registerAddress: 325,
        registerNumber: 326,
        numberOfRegisters: 1,
        representation: "16 bit unsigned integer"
    },
    329: {
        requiredValue: "Modem ID",
        registerAddress: 328,
        registerNumber: 329,
        numberOfRegisters: 8,
        representation: "ASCII"
    },
    349: {
        requiredValue: "IMSI",
        registerAddress: 348,
        registerNumber: 349,
        numberOfRegisters: 16,
        representation: "ASCII"
    },
    365: {
        requiredValue: "Unix timestamp",
        registerAddress: 364,
        registerNumber: 365,
        numberOfRegisters: 2,
        representation: "32 bit unsigned integer"
    },
    367: {
        requiredValue: "Local ISO time",
        registerAddress: 366,
        registerNumber: 367,
        numberOfRegisters: 12,
        representation: "ASCII"
    },
    379: {
        requiredValue: "UTC time",
        registerAddress: 378,
        registerNumber: 379,
        numberOfRegisters: 12,
        representation: "ASCII"
    },
    395: {
        requiredValue: "LAN IP",
        registerAddress: 394,
        registerNumber: 395,
        numberOfRegisters: 2,
        representation: "16 bit unsigned integer"
    },
    398: {
        requiredValue: "Add SMS",
        registerAddress: 397,
        registerNumber: 398,
        numberOfRegisters: 90,
        representation: "ASCII"
    },
    488: {
        requiredValue: "Mobile data received last month (SIM1)",
        registerAddress: 487,
        registerNumber: 488,
        numberOfRegisters: 4,
        representation: "32 bit unsigned integer"
    },
    492: {
        requiredValue: "Mobile data sent last month (SIM1)",
        registerAddress: 491,
        registerNumber: 492,
        numberOfRegisters: 4,
        representation: "32 bit unsigned integer"
    },
    496: {
        requiredValue: "Mobile data received last month (SIM2)",
        registerAddress: 495,
        registerNumber: 496,
        numberOfRegisters: 4,
        representation: "32 bit unsigned integer"
    },
    500: {
        requiredValue: "Mobile data sent last month (SIM2)",
        registerAddress: 499,
        registerNumber: 500,
        numberOfRegisters: 4,
        representation: "32 bit unsigned integer"
    },
    504: {
        requiredValue: "Mobile data received last week (SIM1)",
        registerAddress: 503,
        registerNumber: 504,
        numberOfRegisters: 4,
        representation: "32 bit unsigned integer"
    },
    508: {
        requiredValue: "Mobile data sent last week (SIM1)",
        registerAddress: 507,
        registerNumber: 508,
        numberOfRegisters: 4,
        representation: "32 bit unsigned integer"
    },
    512: {
        requiredValue: "Mobile data received last week (SIM2)",
        registerAddress: 511,
        registerNumber: 512,
        numberOfRegisters: 4,
        representation: "32 bit unsigned integer"
    },
    516: {
        requiredValue: "Mobile data sent last week (SIM2)",
        registerAddress: 515,
        registerNumber: 516,
        numberOfRegisters: 4,
        representation: "32 bit unsigned integer"
    }
};

function parseValue(record) {

    if (!record || !record.data) {
        return record?.data;
    }

    const registerInfo = registerMap[record.addr];

    if (!registerInfo) {
        return record.data;
    }

    const repr = registerInfo.representation.toLowerCase();

    // Should be parsed as number metric value
    if (repr.includes('bit') && (repr.includes('integer') || repr.includes('unsigned') || repr.includes('float'))) {
        const parsed = parseFloat(record.data);
        return isNaN(parsed) ? record.data : parsed;
    }

    // Should be parsed as text metric value
    if (repr.includes('ascii')) {
        return record.data.toString();
    }

    // If no specific format matched, return the original value
    return record.data;
}

function convertPayload(payload, context) {

    if (typeof payload !== 'object' || payload === null) {
        context.logError("Payload is not an object");
        return;
    }

    const records = Object.values(payload)
        .filter(v => Array.isArray(v))
        .flat();

    if (!records.length) {
        context.logError("No valid records array found");
        return;
    }

    // Buffer to collect GPS data lat (144) and lon (146) per subject
    const locationPerSubject = new Map();

    for (const record of records) {
        if (
            !record ||
            record.server_name == null ||
            record.server_id == null ||
            record.addr == null ||
            record.timestamp == null ||
            record.data == null
        ) {
            continue; // skip any incomplete entries
        }

        const subjectExternal = `${record.server_name}-${record.server_id}`;
        const metricExternal = `${record.full_addr}`;
        const ingestionId = `${subjectExternal}$${metricExternal}`;
        const ingestionDate = date(record.timestamp * 1000);

        const parsedValue = parseValue(record);

        if (!isNaN(parsedValue) && isFinite(parsedValue)) {
            context.addMeasurement(ingestionId, parsedValue, ingestionDate);
        }

        // Collect lat/lon to combine and add later
        if (record.addr === 144 || record.addr === 146) {
            let entry = locationPerSubject.get(subjectExternal);
            if (!entry) {
                entry = { lat: null, lon: null, latDate: null, lonDate: null };
                locationPerSubject.set(subjectExternal, entry);
            }
            if (record.addr === 144) {
                entry.lat = parsedValue;
                entry.latDate = record.timestamp;
            } else {
                entry.lon = parsedValue;
                entry.lonDate = record.timestamp;
            }
        }
    }

    // Ingest if collected GPS data exists with the same date for each subject
    for (const [subjectExternal, entry] of locationPerSubject.entries()) {
        if (
            entry.lat != null &&
            entry.lon != null &&
            entry.latDate != null &&
            entry.lonDate != null &&
            entry.latDate === entry.lonDate
        ) {
            const locationId = `${subjectExternal}$location`;
            const locationValue = { lat: entry.lat, lon: entry.lon, alt: 0 };
            context.addMeasurement(locationId, locationValue, date(entry.latDate * 1000));
        }
    }
}
