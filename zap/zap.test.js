/* eslint-disable no-underscore-dangle */
import * as convert from "xml-js";
import fs from "fs";
import log from "log";
import expect from "expect";
import Utils from "../common/utils";

const utils = new Utils();

const zapReportFile = `${process.env.INIT_CWD}/zap-report.xml`;

if (!fs.existsSync(zapReportFile)) {
    throw new Error(
        'The "zap-report.xml" file is required in the project root for running security tests. ' +
      "Make sure to first run ZAP to generate the report before running these tests."
    );
}

const xml = fs.readFileSync(zapReportFile, "utf8");
const jsonResult = JSON.parse(
    convert.xml2json(xml, { compact: true, spaces: 4 })
);

/**
 * Parses the zap json report and return an object with the sum of each high, medium and low alerts.
 * @param {object} jsonReport The Zap report in jsonFormat.
 * @return {{high: number, medium: number, low: number}} Sum for each high, medium and low alerts.
 */
const parsReport = jsonReport => {
    const reportNumbers = { high: 0, medium: 0, low: 0 };

    jsonReport.OWASPZAPReport.site.alerts.alertitem.forEach(item => {
        if (item.riskcode._text === "3") {
            reportNumbers.high += 1;
        }
        if (item.riskcode._text === "2") {
            reportNumbers.medium += 1;
        }
        if (item.riskcode._text === "1") {
            reportNumbers.low += 1;
        }
    });

    return reportNumbers;
};

const reportData = parsReport(jsonResult);

const alertsRequired = Utils.getJsonFromFile('/zap/alerts.json')[utils.deviceType];

describe(`Zap report for ${utils.deviceType} needs to contain`, () => {
    it(`${alertsRequired.high} High risk alerts`, () => {
        log.info(`High risk alerts found: ${reportData.high}`);
        expect(reportData.high).toEqual(alertsRequired.high);
    });

    it(`${alertsRequired.medium} Medium risk alerts`, () => {
        log.info(`Medium risk alerts found: ${reportData.medium}`);
        expect(reportData.medium).toEqual(alertsRequired.medium);
    });

    it(`${alertsRequired.low} Low risk alerts`, () => {
        log.info(`Low risk alerts found: ${reportData.low}`);
        expect(reportData.low).toEqual(alertsRequired.low);
    });
});
