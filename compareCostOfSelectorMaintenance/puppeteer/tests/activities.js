const assert = require('assert');
const puppeteer = require('puppeteer');

describe('test todo mvc activities', () => {

    before(async () => {
        browser = await puppeteer.launch({headless: false,args:['--window-size=1440,900']});
        page = await browser.newPage();
        await page.setViewport({width:1440,height:900});
        const [response] = await Promise.all([
            page.waitForNavigation(), // The promise resolves after navigation has finished
            page.goto('http://todomvc.com/examples/angularjs/#/'),
          ]);
    });

    after(async () => {
        await browser.close();
    });

    function delay(timeout) {
        return new Promise((resolve) => {
          setTimeout(resolve, timeout);
        });
      }
      
    it('should clear completed tasks',async () => {
        await page.waitForSelector('input.new-todo')

        await page.type('input.new-todo','Demo');
        await page.type('input.new-todo',String.fromCharCode(13));

        var newElements = (await page.$$('ul.todo-list>li'))
        assert.ok(newElements.length==1)

        await page.click('input.toggle');

        var newElements = (await page.$$('ul.todo-list>li.completed'))
        assert.ok(newElements.length==1)

        await page.click('button.clear-completed');
        var completedElements = (await page.$$('ul.todo-list>li'))
        assert.ok(completedElements.length==0)
  
      });

    it('should mark task as complete', async () => {
      await page.waitForSelector('input.new-todo')

      await page.focus('input.new-todo')
      await page.type('input.new-todo','Complete Task');
      await page.type('input.new-todo',String.fromCharCode(13));

      var newElements = (await page.$$('ul.todo-list>li'))
      assert.ok(newElements.length==1)

      await page.click('input.toggle');

      var newElements = (await page.$$('ul.todo-list>li.completed'))
      assert.ok(newElements.length==1)

      await page.click('button.clear-completed');
      var completedElements = (await page.$$('ul.todo-list>li'))
      assert.ok(completedElements.length==0)
    });

    it('should list active tasks', async () => {
      await page.waitForSelector('input.new-todo')

      await page.focus('input.new-todo')
      await page.type('input.new-todo','Active Task');
      await page.type('input.new-todo',String.fromCharCode(13));

      await page.focus('input.new-todo')
      await page.type('input.new-todo','Completed Task');
      await page.type('input.new-todo',String.fromCharCode(13));

      var newElements = (await page.$$('ul.todo-list>li'))
      assert.ok(newElements.length==2)

      await page.click('input.toggle');
      assert.ok((await page.$$('ul.todo-list>li.completed')).length==1)

      const [element] = await page.$x("//a[text()='Active']");
      await element.click();

      var activeElements = (await page.$$('ul.todo-list>li'))
      assert.ok(activeElements.length==1)
    });

});