# lets-test
It lets you test without doing all the nasty configuration. It has support for running:
* integration tests using [WebdriverIO 5](https://webdriver.io/)
* performance tests using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/)
* security tests using [ZAP](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project)
* SSR tests using [Puppeteer](https://developers.google.com/web/tools/puppeteer/)

Coming soon:
* tool for mocking api
* visual regression tests

## Installation
```bash
npm i lets-test --save-dev
```

### How to run wdio tests
WebdriverIO is configured to run with [Mocha](https://mochajs.org/) and [Jest Expect](https://jestjs.io/docs/en/expect).  
1. After installing the package, create the following folder structure for you *.spec.js test files.
    ```bash
    test/
    -- wdio/
    -- -- *.spec.js
    ```
2. For running your tests use:
    * to run tests in mobile, tablet and desktop using headless
    ```bash
    npx lets-run-wdio
    ```
    * to run on mobile only use DEVICE, it can be "mobile", "tablet" or "desktop"
    ```bash
    DEVICE=mobile npx lets-run-wdio
    ```
    * if you don't what to run headless use NOT_HEADLESS
    ```bash
    NOT_HEADLESS=true npx lets-run-wdio
    ```

### How to run performance tests
1. After installing the package, create the following folder structure.
    ```bash
    test/
    -- lighthouse/
    ```
2. Inside test/lighthouse/ you need to create an urls.json file, this will tell lighthouse what URLs to test.  
    Here is an example:
    ```json
    {
      "urls": [
        {
          "name": "The name of the page (for the report)",
          "url": "http://localhost:8080",
          "optimal": {
            "mobile": {
              "speedIndex": 3500,
              "firstMeaningfulPaint": 3800,
              "domSize": 1500,
              "estimatedInputLatency": 2400,
              "totalByteWeight": 1638400,
              "criticalRequestChains": 2
            },
            "tablet": {
              "speedIndex": 3700,
              "firstMeaningfulPaint": 4200,
              "domSize": 1500,
              "estimatedInputLatency": 4800,
              "totalByteWeight": 1638400,
              "criticalRequestChains": 2
            },
            "desktop": {
              "speedIndex": 2400,
              "firstMeaningfulPaint": 4400,
              "domSize": 1500,
              "estimatedInputLatency": 2400,
              "totalByteWeight": 1638400,
              "criticalRequestChains": 2
            }
          }
        }
      ]
    }
    ```
    As you can see, "urls" it's an array so you can specify multiple URLs to be tested.  
    Feel free to set your optimal values (speedIndex, domSize...) as you consider best for your application.  
3. For running your tests use:
    ```bash
    DEVICE=mobile npx lets-run-lighthouse
    ```
    DEVICE can be "mobile", "tablet" or "desktop"

### How to run security tests
1. After installing the package, create the following folder structure.
    ```bash
    test/
    -- zap/
    ```
2. Inside test/zap/ you need to create an alerts.json file, this will tell zap how many "high", "medium" and "low" alerts you expect to have on each device (mobile, tablet and desktop).  
    Here is an example:
    ```json
    {
      "mobile": {
        "high": 0,
        "medium": 1,
        "low": 2
      },
      "tablet": {
        "high": 0,
        "medium": 1,
        "low": 2
      },
      "desktop": {
        "high": 0,
        "medium": 1,
        "low": 2
      }
    }
    ```
3. Generate the ZAP report:
    * first you need to install zap on you machine, just download the [Cross Platform Package](https://github.com/zaproxy/zaproxy/wiki/Downloads). This runs with JAVA so make you you also have JAVA installed.
    * to simplify the command line it's best to create an env variable in you system that points to the ZAP installation folder something like: $ZAP_PATH
    * now go you your project root and run ZAP like this: (replace -quickurl with your application homepage)
    ```bash
    java -jar $ZAP_PATH/zap-2.7.0.jar -cmd -installdir $ZAP_PATH -quickurl http://localhost:8080 -quickout $PWD/zap-report.xml
    ```
4. So step 3 will generate an zap-report.xml file in the root of you project.  
    To see if the zap report contains the same number of alerts that you expect, hopefully 0, run:
    ```bash
    DEVICE=mobile npx lets-run-zap
    ```
    DEVICE can be "mobile", "tablet" or "desktop"

### How to run SSR (Server side rendering) tests
1. After installing the package, create the following folder structure.
    ```bash
    test/
    -- ssr/
    ```
2. Inside test/ssr/ you need to create an urls.json file, this will tell our script what URLs to test.  
    Here is an example:
    ```json
    {
      "urls": [
        {
          "name": "The name of the page (for the report)",
          "url": "http://localhost:8080"
        }
      ]
    }
    ```
    As you can see, "urls" it's an array so you can specify multiple URLs to be tested. 
3. To run the tests use:
    ```bash
    DEVICE=mobile npx lets-run-ssr
    ```
    DEVICE can be "mobile", "tablet" or "desktop"