const headless = process.env.NOT_HEADLESS ? [] : ['--headless'];

/**
 * Set all available devices capabilities
 */
const allDevicesCapabilities = {
    desktop: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    ...headless,
                    'window-size=1366,768',
                    '--disable-web-security',
                    '--no-sandbox',
                ],
            },
        },
    ],
    mobile: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    ...headless,
                    'window-size=375,812',
                    '--disable-web-security',
                    '--no-sandbox',
                ],
                'mobileEmulation': {
                    deviceName: 'iPhone X'
                },
            },
        },
    ],
    tablet: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    ...headless,
                    'window-size=1024,1366',
                    '--no-sandbox',
                    '--disable-web-security',
                ],
                'mobileEmulation': {
                    deviceName: 'iPad Pro'
                },
            },
        },
    ],
};

allDevicesCapabilities.all = allDevicesCapabilities.desktop
    .concat(allDevicesCapabilities.mobile).concat(allDevicesCapabilities.tablet);

/**
 * Gets capabilities based on the environment variable DEVICE
 * @returns {capabilities} If DEVICE is not set, tests will run on all devices
 * @private
 */
const deviceCapabilities = () => {
    const envDevice = process.env.DEVICE ? process.env.DEVICE.toLowerCase() : '';
    switch (envDevice) {
    case 'desktop': return allDevicesCapabilities.desktop;
    case 'mobile': return allDevicesCapabilities.mobile;
    case 'tablet': return allDevicesCapabilities.tablet;
    default: return allDevicesCapabilities.all;
    }
};

const capabilities = deviceCapabilities();

module.exports = { capabilities, allDevicesCapabilities };
