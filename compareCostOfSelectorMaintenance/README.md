**Cost of test Maintenance**

This project has tests for the [todoMVC app](http://todomvc.com/examples/react/#/). The reason we chose this APP is because it is written in a bunch of UI frameworks with the same functionality. For this validation, we will be using the React and AngularJS flavours of the APP. Here we will be comparing Writing and maintaining costs associated with the tools. 

Ideally, with functionality intact, the test code shouldn’t change. i.e when the user workflow hasn‘t changed, the test code shouldn’t have to change. 
Therefore, tools with lesser dependency on DOM is better for writing and maintaining tests!

Here the same react application is automated using 5 browser automation tools. All the tests are currently passing!
Let's see what happens to the tests if the application is re-written in angularJS instead of react. 
To do this find and replace all occurances of `http://todomvc.com/examples/react/#/`with `http://todomvc.com/examples/angularjs/#/` and execute the tests!

**To execute tests**
* Select the tool to run the test against
* `cd` into the corresponding directory
* `npm install`
* `npm test`
> Currently tests of all tools pass
* find and replace all occurances of `http://todomvc.com/examples/react/#/`with `http://todomvc.com/examples/angularjs/#/` and execute the tests!
* Save all
* Run the tests again `npm test`

**Findings - All tools except for Taiko fail when the DOM changed!**
- Selenium - Selectors are highly DOM dependent. The tool doesn’t have an option to do a text search.
- WebdriverIO - Has [Text search](https://webdriver.io/docs/selectors.html#element-with-certain-text) option on a selected element. The [selectors](https://webdriver.io/docs/selectors.html) have very limited options for being DOM independent. This is not sufficient to write tests with DOM independent selectors.
- Testcafe  - There are Limited options for DOM independent selectors like [text search](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors/functional-style-selectors.html#withtext). This is still not sufficient to write tests with DOM independent selectors. 
- Cypress - Some options for [DOM independent selectors](https://docs.cypress.io/api/commands/contains.html#Syntax). In some cases text across DOM elements can also be found. This makes the text search is better than TestCafe, but has issues when there are multiple matches. Cannot use DOM independent selectors for elements with no text. This limits the user in writing tests which are independent of DOM.
- Puppeteer - The selectors heavily depend on DOM. There doesn’t seem to be are no easy ways to do a text search unless user creates wrappers for it. 

**Why Taiko tests passed even when DOM changed**
- Taiko has many options for [selectors that are independent of DOM](https://taiko.gauge.org/#smart-selectors). It has options to search for text without worrying about it spanning across DOM elements. Smart selectors allow users to select element for interaction without inspecting DOM details. [Proximity selectors](https://taiko.gauge.org/#toleftof) help user select required element when multiple matches are found. All these were sufficient to handle the test cases given.
> Taiko has fallback options that can be used DOM independent selectors are not sufficient!

