# compareBrowserAutomationTools

In this repo we have test cases of the same workflow built with different automation testing tools(Selenium, Cypress, Puppeteer, WebdriverIO, TestCafe and Taiko). 
The intention is to compare the tools for Reliability, maintainability and performance.
Below are some of our findings.

## System under test
[Todomvc](https://todomvc.com/) is a simple todo app. It has the same workflow built with different frameworks like react, angularjs and many more. 

## Reliability 
Tools are less reliable if running the same tests multiple times gives inconsistent results. 

## Maintainability 
Tools are marked as less maintainable if changing the underlying framework fails the existing tests. 

## Performance 
This is the time taken by the individual tools to run the test scenarios in sequence.

Note:- Parallel run with Test Framework Integration - Tools that can take advantage of runner(example Gauge) features like parallel runs to give faster 
Here are the findings

![Comparison Summary](https://gauge.org/assets/images/blog/taiko_comparison_infographic_blog_post.jpg)
