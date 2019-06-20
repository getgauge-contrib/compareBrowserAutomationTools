# Benchmark taiko

This repo has tests written using cypress, selenium js, taiko, testcafe and webdriverIO. Tests are written against the sample angular customer manager app which tests the flows of adding, editing, filtering and viewing customer details.

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

Hardware details of system used for testing: 

```
Model Name: MacBook Pro
Model Identifier: MacBookPro15,1
Processor Name: Intel Core i7
Processor Speed: 2.2 GHz
Number of Processors: 1
Total Number of Cores: 6
L2 Cache (per Core): 256 KB
L3 Cache: 9 MB
Memory: 16 GB
Boot ROM Version: 220.240.2.0.0 
```

Software details:

```
System Version: macOS 10.14 (18A391)
Kernel Version: Darwin 18.0.0
Boot Volume: Macintosh HD
Boot Mode: Normal
node: v12.1.0
```
All tests were ran in headless mode using command `time npm test`. Mocha runner is used expect for cypress and testcafe. Lesser time and lesser CPU denotes better performance. 

Versions of tools used: 

- Cypress - 3.2.0
- Selenium - 4.0.0-alpha.1 (chromedriver - 74.0.0)
- Taiko - 0.8.0
- Testcafe - 1.2.0
- WebdriverIO - 5.9.6 (chromedriver - 74.0.0)
- Puppeteer - 1.17.0

| Tools       | CPU(%) | Total(sec) |
|-------------|--------|------------|
| Cypress     | 111    | 15.734     |
| Puppeteer   | 53     | 2.625      |
| Selenium    | 6      | 13.687     |
| Taiko       | 41     | 6.556      |
| Testcafe    | 26     | 20.370     |
| WebdriverIO | 46     | 5.447      |


