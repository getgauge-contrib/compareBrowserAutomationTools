## Wait Mechanisms

In this example, all tools except Taiko and TestCafe needed at least one/more waits to be handled explicitly in code. To validate it, comment all the wait conditions added explicitly in code. Execute it; Please note the tests may have to be run consecutively a couple of times to observe the flakiness. 

To support explicit waits tools offer very granular control of wait mechanisms. That could lead to different APIs doing similar tasks. The explicit waits requires understanding internals of system under test and the tool used.

Modern tools try to intelligently identify the conditions to wait for by introducing implicit waits. 

| Tool        | Wait Mechanisms                                                                                                                               | Ease of use                                                                                |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Cypress     | Handles some cases with implicit waits.(Element to be actionable)                                                                         | Has APIs to [wait for requests](https://docs.cypress.io/api/commands/wait.html#Syntax) other waits to be handled using promises                              |
| Puppeteer   | Handles some cases with implicit waits.(Page loads on goto navigation)                                                                    | Has APIs to [wait for navigation](https://github.com/GoogleChrome/puppeteer/blob/v1.18.0/docs/api.md#pagewaitfornavigationoptions) and [wait for some predicates](https://github.com/GoogleChrome/puppeteer/blob/v1.18.0/docs/api.md#pagewaitforselectororfunctionortimeout-options-args). |
| Selenium    | All waits has to be handled by user.                                                                                                      | Has APIs to [wait for conditions](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html#wait)                                            |
| Taiko       | Handles most cases with implicit waits.(Element visibility, page loads, xhrs, new tab/window open or close)                               | Most waits handled implicitly. Has good fallback options to waits explicitly in code using wait for events and [waitFor](https://taiko.gauge.org/#waitfor) api.           |
| Testcafe    | Handles most cases with [implicit waits](https://devexpress.github.io/testcafe/documentation/test-api/built-in-waiting-mechanisms.html).  | Most waits handled implicitly. Fallback is not very extensive, can only wait for some time.                             |
| WebdriverIO | All waits has to be handled by user.                                                                                                      | Has APIs to wait for element displayed, exits and enabled. Also [`waitUntil`](https://webdriver.io/docs/api/browser/waitUntil.html) that takes a predicate to waitFor.                        |


#### More observations:

- Cypress - There are [few](https://github.com/getgauge-contrib/forToolComparison/blob/4b39899562b8ad8cb53e464aecfb339219fc8bd5/comparePerformanceAndFlakinessOfTools/benchmarks/cypress/tests/customerManager.test.js#L32) scenario where the implicit waits were not enough. Reference [issue](https://github.com/cypress-io/cypress/issues/2113)

- Selenium - The implicit waits that can be added by `await driver.manage().setTimeouts({implicit: 5000});` to wait for elements does not handle all the cases, even with that had to add explicit waits.

- WebdriverIO - The implicit waits that can be added by `await browser.setTimeout({ 'implicit': 5000 });` to wait for elements works fine in most cases but they tend to hit the performance of sample test suite by 3 secs on an average(Tests ran with same spec as used for performance comparison). 

- Puppeteer - Syntax for `waitForNavigation` has to be handled with caution using `Promise.All` like mentioned in [example](https://github.com/GoogleChrome/puppeteer/blob/v1.18.0/docs/api.md#pagewaitfornavigationoptions) else the wait wont happen properly or the script hangs. 

