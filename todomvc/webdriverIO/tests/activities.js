const assert = require('assert');

describe('test todo mvc activities', () => {
    
    before(async () => {
        await browser.setWindowSize(1440, 900);
        await browser.url('http://todomvc.com/examples/react/#/');
    });

    it('should clear completed tasks',async () => {
        await (await $('input[placeholder="What needs to be done?"]')).waitForExist();
        await (await $('input[placeholder="What needs to be done?"]')).setValue('Demo');
        await browser.keys('Enter')
        await (await $('input[class="toggle"]')).click();
    });
});