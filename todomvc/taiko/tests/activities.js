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

    it('should add task', async () => {
        await write('Add Task');
        await press('Enter')
        assert.ok(await text('1 item left').exists());

        await click($("#toggle-all"));
        await click("Clear completed");
    });

    it('should mark task as complete', async () => {
        await write('Complete Task');
        await press('Enter')
        assert.ok(await text('1 item left').exists());
        await click(checkBox(near('Complete Task')))
        assert.ok(await text('0 items left').exists());

        await click($("#toggle-all"));
        await click("Clear completed");
    });

    it('should list active tasks', async () => {
        await write('Complete Task');
        await press('Enter')
        assert.ok(await text('1 item left').exists());
        await click('Active')
        assert.ok(await text('Complete Task').exists());

        await click(checkBox(near('Complete Task')))
        assert.ok(await text('0 items left').exists());

        await click('Active')
        assert.ok(await !text('Complete Task').exists());

        await click($("#toggle-all"));
        await click("Clear completed");
    });

    it('should list completed tasks', async () => {
        await write('Completed Task');
        await press('Enter')
        assert.ok(await text('1 item left').exists());
        await click('Completed')
        assert.ok(await !text('Completed Task').exists());
        await click('All')

        await click(checkBox(near('Completed Task')))
        assert.ok(await text('0 items left').exists());

        await click('Completed')
        assert.ok(await text('Completed Task').exists());

        await click($("#toggle-all"));
        await click("Clear completed");
    });

    it('should clear completed tasks', async () => {
        await write('Clear Task');
        await press('Enter')
        assert.ok(await text('1 item left').exists());
        await click(checkBox(near('Clear Task')))
        assert.ok(await text('0 items left').exists());

        await click('Clear completed')
        assert.ok(await !text('Clear Task').exists());

        await click($("#toggle-all"));
        await click("Clear completed");
    });

    it('should remove task', async () => {
        await write('Remove Task');
        await press('Enter')
        assert.ok(await text('1 item left').exists());
        await hover("Remove Task");
        await click(button({class:"destroy"}));
        assert.ok(await !text('Remove Task').exists());

        await click($("#toggle-all"));
        await click("Clear completed");
    });
});