import puppeteer from "puppeteer";
import PixelDiff from "pixel-diff";
import log from "log";

/**
 * Gets the screenshot path and name.
 * @param {string} fileName The base name of the file.
 * @param {boolean} withoutJS True if screenshot needs to be saved in the "withoutJS", false for "withJS" folder.
 * @returns {string} Path and name for the screenshot.
 */
const getScreenshotPath = (fileName, withoutJS) => {
    const jsFolderPath = withoutJS ? "withJS" : "withoutJS";
    const newFileName = fileName.replace(/ /g, "-").concat(`.png`);
    return `${process.env.OLDPWD}/screenshots/ssr/${jsFolderPath}/${newFileName}`;
};

/**
 * Takes a puppeteer screenshot for the provider URL with or without JavaScript.
 * @param {object} puppeteerPage The puppeteer page object.
 * @param {string} competitionsULR The URL for the page.
 * @param {string} fileName The screenshot's name.
 * @param {boolean} withJS True if page needs to load with JavaScript.
 * @return {Promise.<void>} Screenshot promise.
 */
export const takePuppeteerScreenshot = async (
    puppeteerPage,
    competitionsULR,
    fileName,
    withJS
) => {
    await puppeteerPage.setJavaScriptEnabled(withJS);
    await puppeteerPage.goto(competitionsULR);
    await puppeteerPage.screenshot({
        path: await getScreenshotPath(fileName, withJS),
        fullPage: true
    });
};

/**
 * Lunches the puppeteer browser with different viewport sizes based on the DEVICE env variable.
 * @return {Promise.<{browser: *, page: *}>} Puppeteer browser and page objects.
 */
export const lunchPuppeteer = async () => {
    let viewportSize = {};
    const envDevice = process.env.DEVICE
        ? process.env.DEVICE.toLowerCase()
        : "";
    switch (envDevice) {
        case "desktop":
            viewportSize = { width: 1366, height: 768 };
            break;
        case "mobile":
            viewportSize = { width: 375, height: 667 };
            break;
        case "tablet":
            viewportSize = { width: 1024, height: 768 };
            break;
        default:
            viewportSize = { width: 1366, height: 768 };
            break;
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-web-security"
        ]
    });
    const page = await browser.newPage();
    await page.setViewport(viewportSize);

    return { browser, page };
};

/**
 * Compares two images and checks if the images are within tolerance ratio
 * @param {string} imageName The image name
 * @returns {boolean} True if the images are similar
 */
export const screenshotsAreSimilar = async imageName => {
    const diff = new PixelDiff({
        imageAPath: await getScreenshotPath(imageName, true),
        imageBPath: await getScreenshotPath(imageName, false),
        thresholdType: PixelDiff.THRESHOLD_PERCENT,
        threshold: 0.05
    });
    const result = await diff.runWithPromise();
    const hasPassed = diff.hasPassed(result.code);
    if (!hasPassed) {
        log.error(`Found ${result.differences} differences for '${imageName}'`);
    }
    return hasPassed;
};
