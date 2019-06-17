const { describe, it, after, before } = require('mocha');
const webPage = require('../utils/driverActions');
const assert = require('assert');
const webdriver = require('selenium-webdriver');

describe ('test customer manager', async function () {
    let webpage, driver;

    before(async () => {
        webpage = new webPage();
        driver = webpage.driver;
        await webpage.visit('http://todomvc.com/examples/react/#/');
    });

    after(async () => {
        await webpage.quit();
    });

    it('should clear completed tasks',async () => {
        await driver.sleep(1000);
        (await webpage.findByCss('input[placeholder="What needs to be done?"]')).sendKeys('Demo');
        await driver.sleep(1000);        
        (await webpage.findByCss('input[placeholder="What needs to be done?"]')).sendKeys(webdriver.Key.ENTER);
        await driver.sleep(1000);        
        
        (await webpage.findByCss('input[class="toggle"]')).click();
    });
    
});
