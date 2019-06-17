const assert = require('assert');
const { openBrowser,closeBrowser, goto, checkBox, click, near,waitFor,
    write, text, press } = require('taiko');

describe('test todo list', () => {

    before(async () => {
        await openBrowser({headless:false});
        await goto('http://todomvc.com/examples/react/#/'); 
    });

    after(async () => {
        await closeBrowser();
    });

    it('should clear completed tasks', async () => {
        await write('Demo');
        await press('Enter')
        assert.ok(await text('1 item left').exists());
        await click(checkBox(near('Demo')))
        assert.ok(await text('0 items left').exists());

        await click('Clear completed')
    });

});