import { Selector } from 'testcafe';

fixture `test todo mvc activities`
    .page `http://todomvc.com/examples/angularjs/#/`;

test('should clear completed tasks',async (t) => {
    await t.typeText(await Selector('input[placeholder="What needs to be done?"]'),'Demo');
    await t.pressKey( 'enter' )
    
    const allTodos = await Selector('li').withText("Demo");
    await t.expect(allTodos.count).eql(1);
    
    await t.click(await Selector('input[class="toggle"]'));

    await t.click(await Selector('button[class="clear-completed"]'));
    const allTodosCompleted = await Selector('li').withText("Demo");
    await t.expect(allTodosCompleted.count).eql(0);
});

test('should mark task as complete', async (t) => {
    await t.typeText(await Selector('input[placeholder="What needs to be done?"]'),'Compelete Task');
    await t.pressKey( 'enter' )
    
    const allTodos = await Selector('li').withText("Compelete Task");
    await t.expect(allTodos.count).eql(1);
    
    await t.click(await Selector('input[class="toggle"]'));
    await t.click(await Selector('a').withText('Completed'));

    const allTodosCompleted = await Selector('li').withText("Compelete Task");
    await t.expect(allTodosCompleted.count).eql(1);

    await t.click(await Selector('button[class="clear-completed"]'));
    const allTodos1 = await Selector('li').withText("Compelete Task");
    await t.expect(allTodos1.count).eql(0);
});

test('should list active tasks', async (t) => {
    await t.typeText(await Selector('input[placeholder="What needs to be done?"]'),'Active Task');
    await t.pressKey( 'enter' )

    await t.typeText(await Selector('input[placeholder="What needs to be done?"]'),'Completed Task');
    await t.pressKey( 'enter' )

    const todo1 = await Selector('li').withText("Active Task");
    await t.expect(todo1.count).eql(1);

    const todo2 = await Selector('li').withText("Completed Task");
    await t.expect(todo2.count).eql(1);

    await t.click(await Selector('input[class="toggle"]'));
    await t.click(await Selector('a').withText('Active'));

    const todoCompleted = await Selector('li').withText("Active Task");
    await t.expect(todoCompleted.count).eql(0);

    const todoActive = await Selector('li').withText("Completed Task");
    await t.expect(todoActive.count).eql(1);
});
