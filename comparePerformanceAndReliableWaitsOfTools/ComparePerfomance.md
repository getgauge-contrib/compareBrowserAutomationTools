## Performance comparison of tools

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
All tests were ran in headless mode using command `time npm test`. Mocha runner is used expect for testcafe, cypress bundles its own runner built on top of Mocha. Lesser time and lesser CPU denotes better performance. 

Versions of tools used: 

|                      Tools                       | CPU(%) | Total(sec) |
|--------------------------------------------------|--------|------------|
| Selenium - 4.0.0-alpha.7 (chromedriver - 83.0.0) |      8 |     13.240 |
| WebdriverIO - 6.1.17 (chromedriver - 83.0.0)     |     56 |      5.044 |
| Testcafe - 1.8.0                                 |     26 |     23.977 |
| Cypress - 4.8.0                                  |    129 |     14.247 |
| Puppeteer - 4.0.0                                |     55 |      2.719 |
| Taiko - 1.0.12                                   |     46 |      4.757 |
