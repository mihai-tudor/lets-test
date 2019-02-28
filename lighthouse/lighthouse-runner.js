import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import config from "lighthouse/lighthouse-core/config/perf-config";
import Utils from "../common/utils";

const utils = new Utils();

/**
 * Runs lighthouse tests and returns results in json format.
 * @param {string} url The page URL.
 * @return {Promise<LH.RunnerResult>} Results in json format.
 */
export default async function runLighthouse(url) {
    const opts = {
        disableDeviceEmulation: utils.isDesktop,
        disableCpuThrottling: utils.isDesktop,
        disableNetworkThrottling: utils.isDesktop,
        chromeFlags: ["--headless", "--no-sandbox", "--disable-web-security"]
    };
    const chrome = await chromeLauncher.launch(opts);
    opts.port = chrome.port;

    const results = await lighthouse(url, opts, config);
    await chrome.kill();
    return results;
}
