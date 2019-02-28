import fs from "fs";

/**
 * Util methods that can be used in all tests.
 */
export default class Utils {
    /**
   * Constructor for Utils.
   */
    constructor() {
        this.envDevice = process.env.DEVICE ? process.env.DEVICE.toLowerCase() : "";
    }

    /**
   * Checks if you are on desktop.
   * @returns {boolean} True if the tests are running on desktop.
   * @public
   */
    get isDesktop() {
        return this.envDevice === "desktop";
    }

    /**
   * Checks if you are on mobile device.
   * @returns {boolean} True if the tests are running on mobile.
   * @public
   */
    get isMobile() {
        return this.envDevice === "mobile";
    }

    /**
   * Checks if you are on tablet device.
   * @returns {boolean} True if the tests are running on tablet.
   * @public
   */
    get isTablet() {
        return this.envDevice === "tablet";
    }

    /**
   * Gets the device type as string.
   * @return {string} The device name (mobile, tablet or desktop), default is mobile.
   */
    get deviceType() {
        if (this.isMobile) {
            return "mobile";
        }
        if (this.isTablet) {
            return "tablet";
        }
        if (this.isDesktop) {
            return "desktop";
        }
        return "mobile";
    }

    /**
     * Parses json file from the specified folder.
     * @param {string} pathInTestFolder The path to the json file in the /test folder.
     * @return {object} Json object.
     */
    static getJsonFromFile = (pathInTestFolder) =>
        JSON.parse(fs.readFileSync(`${process.env.OLDPWD}/test${pathInTestFolder}`));
}
