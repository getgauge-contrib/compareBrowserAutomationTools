const assert = require('assert');
const pw = require('playwright-chromium');

describe('test customer manager', () => {

    before(async () => {
        browser = await pw.chromium.launch({args:['--window-size=1440,900'], headless: true, slowMo: 0});
        context = await browser.newContext();
        page = await context.newPage();
        await page.setViewportSize({width:1440,height:900});
        await page.goto('http://localhost:3000'); 
    });

    after(async () => {
        await page.close()
        await context.close();
        await browser.close();
    });

    it('should navigate to right page', async () => {
        const pageTitle = await page.title();
        assert.equal(pageTitle, 'Angular TypeScript JumpStart App');
    });

    it('should let user login',async () => {
        await page.click('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a');
        await page.fill('input[name="email"]','admin@customermanager.com');
        await page.fill('input[name="password"]','password1234');
        await page.click('button[type="submit"]');
        await page.waitForSelector('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a');
        assert.equal(await page.innerText('body > cm-app-component > main > cm-navbar > nav > div > div > span > ul > li:nth-child(4) > a'),'Logout');
    });

    it('should filter customers', async () => {
        await page.fill('input[name="filter"]','ted');
        await page.press('body','Enter');
        assert.equal((await page.$$('.card')).length,1);  
    });

    it('should let adding customer', async () => {
        await page.click('css=a[href="/customers/0/edit"]');
        await page.fill('input[name="firstName"]','first name');
        await page.fill('input[name="lastName"]','last name');
        await page.fill('input[name="address"]','address');
        await page.fill('input[name="city"]','city');
        await page.selectOption('select', '0: AL');
        await page.click('button[type="submit"]');
        await page.waitForSelector('cm-pagination >> li:nth-child(4) > a');
        await page.click('cm-pagination >> li:nth-child(4) a');
        const xx = await page.waitForSelector('//*[contains(text(),  "First name Last name")]');
        assert.ok((await page.waitForSelector('//*[contains(text(),  "First name Last name")]'))); 
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
        assert.ok((await page.innerText('cm-customer-details h4')).includes('First nameupdated'));
    });

    it('should let view customer order', async () => {
        await page.click('.app-title');
        await page.waitForSelector('a[href="/customers/1/orders"]');
        await page.click('a[href="/customers/1/orders"]');
        await page.waitForSelector('tbody > tr:nth-child(1) > td:nth-child(1)');
        assert.equal(await page.innerText('tbody > tr:nth-child(1) > td:nth-child(1)'),'Basketball');
        assert.equal(await page.innerText('tbody > tr:nth-child(2) > td:nth-child(1)'),'Shoes');
        assert.equal(await page.innerText('.summary-border td:nth-child(2)'),'$207.98');
    });

});