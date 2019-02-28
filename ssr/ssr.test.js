import expect from "expect";
import Utils from "../common/utils";
import { screenshotsAreSimilar, lunchPuppeteer, takePuppeteerScreenshot } from "./puppeteer-tools";

const ssrUrls = Utils.getJsonFromFile('/ssr/urls.json').urls;

ssrUrls.forEach(page => {
    describe("Comparing server side and client side rendering screenshots for", () => {
        let puppeteer;

        before(async () => {
            puppeteer = await lunchPuppeteer();
        });

        after(() => {
            puppeteer.browser.close();
        });

        it(`${page.name} page`, async () => {
            await takePuppeteerScreenshot(
                puppeteer.page,
                page.url,
                page.name,
                false
            );
            await takePuppeteerScreenshot(
                puppeteer.page,
                page.url,
                page.name,
                true
            );
            expect(await screenshotsAreSimilar(page.name)).toBeTruthy();
        });
    });
});
