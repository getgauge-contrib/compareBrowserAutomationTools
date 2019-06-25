const assert = require('assert');
const puppeteer = require('puppeteer');

describe('test customer manager', () => {

    before(async () => {
        browser = await puppeteer.launch({args:['--window-size=1440,900']});
        page = await browser.newPage();
        await page.setViewport({width:1440,height:900});
        await page.goto('http://localhost:3000'); 
    });

    after(async () => {
        await browser.close();
    });

    it('should navigate to right page', async () => {
        const pageTitle = await page.title();
        assert.equal(pageTitle, 'Angular TypeScript JumpStart App');
    });

    it('should let user login',async () => {
        await page.click('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a');
        await page.type('input[name="email"]','admin@customermanager.com');
        await page.type('input[name="password"]','password1234');
        await page.click('button[type="submit"]');
        await page.waitFor(
            selector => document.querySelector(selector).textContent === 'Logout', 
            {}, 
            'body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a'
        );
        assert.equal(await page.$eval('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a',elem => elem.textContent),'Logout');
    });

    it('should filter customers', async () => {
        await page.type('input[name="filter"]','ted');
        await page.keyboard.press('Enter');
        assert.equal((await page.$$('.card')).length,1);  
    });

    it('should let adding customer', async () => {
        await page.click('a[href="/customers/0/edit"]');
        await page.type('input[name="firstName"]','first name');
        await page.type('input[name="lastName"]','last name');
        await page.type('input[name="address"]','address');
        await page.type('input[name="city"]','city');
        await page.select('select', '0: AL');
        await page.click('button[type="submit"]');
        await page.waitForSelector('cm-pagination li:nth-child(4) a');
        await page.click('cm-pagination li:nth-child(4) a');
        await page.waitForXPath('//*[contains(text(),  "First name Last name")]');
        assert.ok((await page.$x('//*[contains(text(),  "First name Last name")]')).length); 
    });

    it('should let edit customer', async () => {
        await page.click('a[href="/customers/23/details');
        await page.waitForSelector('a[routerlink="edit"]');
        await page.click('a[routerlink="edit"]');
        await page.waitForSelector('input[name="firstName"]');
        await page.type('input[name="firstName"]','updated');
        await page.click('button[type="submit"]');
        await page.click('a[href="/customers/23/details');
        await page.waitForSelector('cm-customer-details h4');
        assert.ok((await page.$eval('cm-customer-details h4',elem => elem.textContent)).includes('First nameupdated'));
    });

    it('should let view customer order', async () => {
        await page.click('.app-title');
        await page.waitForSelector('a[href="/customers/1/orders"]');
        await page.click('a[href="/customers/1/orders"]');
        await page.waitForSelector('tbody > tr:nth-child(1) > td:nth-child(1)');
        assert.equal(await page.$eval('tbody > tr:nth-child(1) > td:nth-child(1)',elem => elem.textContent),'Basketball');
        assert.equal(await page.$eval('tbody > tr:nth-child(2) > td:nth-child(1)',elem => elem.textContent),'Shoes');
        assert.equal(await page.$eval('.summary-border td:nth-child(2)',elem => elem.textContent),'$207.98');
    });

});