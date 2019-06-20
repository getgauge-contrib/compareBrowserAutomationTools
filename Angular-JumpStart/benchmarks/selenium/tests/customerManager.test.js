const { describe, it, after, before } = require('mocha');
const webPage = require('../utils/driverActions');
const assert = require('assert');


describe ('test customer manager', async function () {
    let webpage, driver;

    before(async () => {
        webpage = new webPage();
        driver = webpage.driver;
        await webpage.visit('http://localhost:3000');
    });

    after(async () => {
        await webpage.quit();
    });

    it('should navigate to right page', async () => {
        const title = await driver.getTitle();
        assert.equal(title, 'Angular TypeScript JumpStart App');
    });

    it('should let user login',async () => {
        (await webpage.findByCss('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a')).click();
        await driver.sleep(1000);
        (await webpage.findByCss('input[name="email"]')).sendKeys('admin@customermanager.com');
        (await webpage.findByCss('input[name="password"]')).sendKeys('password123');
        (await webpage.findByCss('button[type="submit"]')).click();
        assert.equal(await (await webpage.findByCss('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a')).getText(),'Logout');
    });

    it('should filter customers', async () => {
        (await webpage.findByCss('input[name="filter"]')).sendKeys('ted');
        await driver.sleep(1000);
        assert.equal((await webpage.findAllByCss('.card')).length,1); 
    });

    it('should let adding customer', async () => {
        (await webpage.findByCss('a[href="/customers/0/edit"]')).click();
        await driver.sleep(1000);
        (await webpage.findByCss('input[name="firstName"]')).sendKeys('first name');
        (await webpage.findByCss('input[name="lastName"]')).sendKeys('last name');
        (await webpage.findByCss('input[name="address"]')).sendKeys('address');
        (await webpage.findByCss('input[name="city"]')).sendKeys('city');
        (await webpage.findByCss('select[name="state"]')).click();
        (await webpage.findByCss('select[name="state"] option:nth-child(1)')).click();
        (await webpage.findByCss('button[type="submit"]')).click();
        await driver.sleep(1000);
        (await webpage.findByCss('cm-pagination li:nth-child(4) a')).click(); //click 3
        await driver.sleep(1000);
        let cards = await webpage.findAllByCss('.card .card-header .white');
        let matchFound = false;
        for(const card of cards){
            if ((await card.getText()) === 'First name Last name')matchFound = true;
        };
        assert.ok(matchFound);
    });

    it('should let edit customer', async () => {
        (await webpage.findByCss('a[href="/customers/23/details"]')).click();
        await driver.sleep(1000);
        (await webpage.findByCss('a[href="/customers/23/edit"]')).click();
        await driver.sleep(1000);
        (await webpage.findByCss('input[name="firstName"]')).sendKeys('updated');
        (await webpage.findByCss('button[type="submit"]')).click();
        await driver.sleep(1000);
        (await webpage.findByCss('a[href="/customers/23/details"]')).click();
        await driver.sleep(1000);
        assert.ok((await (await webpage.findByCss('cm-customer-details h4')).getText()).includes('First nameupdated'));
    });

    it('should let view customer order', async () => {
        (await webpage.findByCss('.app-title')).click();
        await driver.sleep(1000);
        (await webpage.findByCss('a[href="/customers/1/orders"]')).click();
        await driver.sleep(1000);
        assert.equal(await (await webpage.findByCss('tbody > tr:nth-child(1) > td:nth-child(1)')).getText(),'Basketball');
        assert.equal(await (await webpage.findByCss('tbody > tr:nth-child(2) > td:nth-child(1)')).getText(),'Shoes');
        assert.equal(await (await webpage.findByCss('.summary-border td:nth-child(2)')).getText(),'$207.98');
    });
    
});
