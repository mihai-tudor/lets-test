const googleOptimal = {
    speedIndex: 1250,
    firstMeaningfulPaint: 1600,
    domSize: 1500,
    estimatedInputLatency: 50,
    totalByteWeight: 1638400,
    criticalRequestChains: 2
};

/**
 * Parses the Lighthouse audits to make them accessible from the tests.
 * @param {Object} report The Lighthouse report to parse.
 * @param {Object} pageOptimal The page optimal values.
 * @returns { {speedIndex: *, firstMeaningfulPaint: *, domSize: *, estimatedInputLatency: *,
 * totalByteWeight: *, criticalRequestChains: *} } The different audits to validate.
 */
const parseLighthouseReport = (report, pageOptimal) => {
    /**
   * Sanitize the audit value.
   * @param {number} value The audit value to be sanitized.
   * @param {string} auditName The audit used for logging purposes.
   * @returns {(number|error)} The audit sanitized value or n exception.
   */
    const sanitizeValue = (value, auditName) => {
        if (value === undefined || value === 0) {
            throw new Error(`The audit ${auditName} has incorrect value: ${value}`);
        } else {
            return value;
        }
    };

    const { audits } = report.lhr;

    const speedIndex = {
        value: sanitizeValue(audits["speed-index"].rawValue, "speed-index"),
        googleOptimalValue: googleOptimal.speedIndex,
        pageOptimalValue: pageOptimal.speedIndex
    };

    const firstMeaningfulPaint = {
        value: sanitizeValue(
            parseInt(audits["first-meaningful-paint"].rawValue, 10),
            "first-meaningful-paint"
        ),
        googleOptimalValue: googleOptimal.firstMeaningfulPaint,
        pageOptimalValue: pageOptimal.firstMeaningfulPaint
    };

    const domSize = {
        value: sanitizeValue(audits["dom-size"].rawValue, "dom-size"),
        googleOptimalValue: googleOptimal.domSize,
        pageOptimalValue: pageOptimal.domSize
    };

    const estimatedInputLatency = {
        value: parseInt(audits["estimated-input-latency"].rawValue, 10),
        googleOptimalValue: googleOptimal.estimatedInputLatency,
        pageOptimalValue: pageOptimal.estimatedInputLatency
    };

    const totalByteWeight = {
        value: sanitizeValue(
            audits["total-byte-weight"].rawValue,
            "total-byte-weight"
        ),
        googleOptimalValue: googleOptimal.totalByteWeight,
        pageOptimalValue: pageOptimal.totalByteWeight
    };

    const criticalRequestChains = {
        value: parseInt(audits["critical-request-chains"].displayValue, 10),
        googleOptimalValue: googleOptimal.criticalRequestChains,
        pageOptimalValue: pageOptimal.criticalRequestChains
    };

    return {
        speedIndex,
        firstMeaningfulPaint,
        domSize,
        estimatedInputLatency,
        totalByteWeight,
        criticalRequestChains
    };
};

module.exports = parseLighthouseReport;
