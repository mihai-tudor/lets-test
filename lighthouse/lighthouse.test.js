import expect from "expect";
import log from "log";
import runLighthouse from "./lighthouse-runner";
import parseLighthouseReport from "./audits";
import Utils from "../common/utils";

const utils = new Utils();
const deviceName = utils.deviceType;

/**
 * logWarning
 * @param {Object} page to be tested
 * @param {string} testedValue the value to be tested
 * @param {Object} resultValue result value
 * @param {Object} googleValue google value
 * @returns {void}.
 */
const logWarning = (page, testedValue, resultValue, googleValue) => {
    if (resultValue > googleValue) {
        log.warn(
            `${testedValue} for ${page.name} on ${deviceName}` +
        ` passed with ${resultValue} but needs to be maximum ${googleValue}`
        );
    }
};

const lighthouseUrls = Utils.getJsonFromFile('/lighthouse/urls.json').urls;

lighthouseUrls.forEach(page => {
    describe(`Running lighthouse tests for ${page.name} on ${deviceName}`, () => {
        let result = null;

        before(async () => {
            const rawResults = await runLighthouse(page.url);
            result = parseLighthouseReport(rawResults, page.optimal[deviceName]);
        });

        it("the speed index is below the optimal value", () => {
            expect(result.speedIndex.value).toBeLessThanOrEqual(
                result.speedIndex.pageOptimalValue
            );
            logWarning(
                page,
                "speed index",
                result.speedIndex.value,
                result.speedIndex.googleOptimalValue
            );
        });

        it("the first meaningful paint is below the optimal value", () => {
            expect(result.firstMeaningfulPaint.value).toBeLessThanOrEqual(
                result.firstMeaningfulPaint.pageOptimalValue
            );
            logWarning(
                page,
                "first meaningful paint",
                result.firstMeaningfulPaint.value,
                result.firstMeaningfulPaint.googleOptimalValue
            );
        });

        it("the DOM size is below the optimal value", () => {
            expect(result.domSize.value).toBeLessThanOrEqual(
                result.domSize.pageOptimalValue
            );
            logWarning(
                page,
                "DOM size",
                result.domSize.value,
                result.domSize.googleOptimalValue
            );
        });

        it("the estimated input latency is below the optimal value", () => {
            expect(result.estimatedInputLatency.value).toBeLessThanOrEqual(
                result.estimatedInputLatency.pageOptimalValue
            );
            logWarning(
                page,
                "estimated input latency",
                result.estimatedInputLatency.value,
                result.estimatedInputLatency.googleOptimalValue
            );
        });

        it("the total byte weight is below the optimal value", () => {
            expect(result.totalByteWeight.value).toBeLessThanOrEqual(
                result.totalByteWeight.pageOptimalValue
            );
            logWarning(
                page,
                "total byte weight",
                result.totalByteWeight.value,
                result.totalByteWeight.googleOptimalValue
            );
        });

        it("the critical request chains is below the optimal value", () => {
            expect(result.criticalRequestChains.value).toBeLessThanOrEqual(
                result.criticalRequestChains.pageOptimalValue
            );
            logWarning(
                page,
                "critical request chains",
                result.criticalRequestChains.value,
                result.criticalRequestChains.googleOptimalValue
            );
        });
    });
});
