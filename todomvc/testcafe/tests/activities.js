import { Selector } from 'testcafe';

fixture `test customer manager`
    .page `http://todomvc.com/examples/react/#/`;

test('should let user login',async (t) => {
    await t.typeText(Selector('input[placeholder="What needs to be done?"]'),'Demo');
    await t.pressKey( 'enter' )
    await t.click(Selector('input[class="toggle"]'));
});

