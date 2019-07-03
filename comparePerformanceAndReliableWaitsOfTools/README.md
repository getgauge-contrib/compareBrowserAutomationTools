## Compare performance and reliable wait mechanisms of test automation tools

Note: Tests are written for comparison of action, code structuring/flow does not imply anything.  

This repo has tests written using cypress, puppeteer, selenium js, taiko, testcafe and webdriverIO. Tests are written against the sample angular customer manager app which tests the flows of adding, editing, filtering and viewing customer details.

### Requirements

- Node 
- Chrome browser

### Starting the angular app

- Clone the repo
- `npm install` to install all dependencies 
- `npm build` to build the app
- `npm start` to start the server which starts it in port 3000 by default

### Running tests

Test are under [benchmarks](https://github.com/getgauge-contrib/Angular-JumpStart/tree/master/benchmarks).
Do `npm install` inside each folder and run using `npm test`

### Results

Results of above tests are compared based on performance and reliability. And below are the details,  

- [Comparison of Performance](https://github.com/getgauge-contrib/compareBrowserAutomationTools/blob/master/comparePerformanceAndReliableWaitsOfTools/ComparePerfomance.md)
- [Comparison of Reliable wait mechanisms](https://github.com/getgauge-contrib/compareBrowserAutomationTools/blob/master/comparePerformanceAndReliableWaitsOfTools/CompareReliableWaitMechanism.md) 

