const assert = require('assert');

describe('test customer manager', () => {
    
    before(async () => {
        await browser.setWindowSize(1440, 900);
        await browser.url('http://todomvc.com/examples/react/#/');
    });

    it('should let user login',async () => {
        await (await $('input[placeholder="What needs to be done?"]')).waitForExist();
        await (await $('input[placeholder="What needs to be done?"]')).setValue('Demo');
        await browser.keys('Enter')
        await (await $('input[class="toggle"]')).click();
    });
});