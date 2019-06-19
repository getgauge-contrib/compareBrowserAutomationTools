const { describe, it, after, before } = require('mocha');
const webPage = require('../utils/driverActions');
const assert = require('assert');
const webdriver = require('selenium-webdriver');

describe ('test todo mvc activities', async function () {
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
        var newElements = (await webpage.findAllByXPath('//ul[@class="todo-list"]/li[@class=""]'))
        assert.ok(newElements.length==1)
        
        await (await webpage.findByXPath('//input[@class="toggle"]')).click();
        var completedElements = (await webpage.findAllByXPath('//ul[@class="todo-list"]/li[@class="completed"]'))
        assert.ok(completedElements.length==1)

        await (await webpage.findByXPath('//button[@class="clear-completed"]')).click();
        assert.ok((await webpage.findAllByXPath('//ul[@class="todo-list"]/li')).length==0)
    });

    it('should mark task as complete', async () => {
        await driver.sleep(1000);
        (await webpage.findByCss('input[placeholder="What needs to be done?"]')).sendKeys('Compelete Task');
        await driver.sleep(1000);        
        (await webpage.findByCss('input[placeholder="What needs to be done?"]')).sendKeys(webdriver.Key.ENTER);
        await driver.sleep(1000);        
        var newElements = (await webpage.findAllByXPath('//ul[@class="todo-list"]/li[@class=""]'))
        assert.ok(newElements.length==1)

        await (await webpage.findByXPath('//input[@class="toggle"]')).click();
        var completedElements = (await webpage.findAllByXPath('//ul[@class="todo-list"]/li[@class="completed"]'))
        assert.ok(completedElements.length==1)

        await (await webpage.findByXPath('//button[@class="clear-completed"]')).click();
        assert.ok((await webpage.findAllByXPath('//ul[@class="todo-list"]/li')).length==0)
    });
  
    it('should list active tasks', async () => {
        await driver.sleep(1000);
        (await webpage.findByCss('input[placeholder="What needs to be done?"]')).sendKeys('Active Task');
        await driver.sleep(1000);        
        (await webpage.findByCss('input[placeholder="What needs to be done?"]')).sendKeys(webdriver.Key.ENTER);

        await driver.sleep(1000);
        (await webpage.findByCss('input[placeholder="What needs to be done?"]')).sendKeys('Completed Task');
        await driver.sleep(1000);        
        (await webpage.findByCss('input[placeholder="What needs to be done?"]')).sendKeys(webdriver.Key.ENTER);
        await driver.sleep(1000);        

        var newElements = (await webpage.findAllByXPath('//ul[@class="todo-list"]/li[@class=""]'))
        assert.ok(newElements.length==2)

        await (await webpage.findByXPath('//input[@class="toggle"]')).click();
        assert.ok((await webpage.findAllByXPath('//ul[@class="todo-list"]/li[@class="completed"]')).length==1)
        await (await webpage.findByXPath('//a[contains(@href,"#/active")]')).click();
        assert.ok((await webpage.findAllByXPath('//ul[@class="todo-list"]/li[@class=""]')).length==1)
    });
  
//     it('should clear completed tasks', async () => {
//     });
    
});
