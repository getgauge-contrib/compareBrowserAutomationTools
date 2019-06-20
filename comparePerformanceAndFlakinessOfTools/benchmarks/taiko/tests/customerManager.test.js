const assert = require('assert');
const { openBrowser,closeBrowser, goto, title, click, textBox, 
    write, text,into, below, press, toRightOf, dropDown } = require('taiko');

describe('test customer manager', () => {

    before(async () => {
        await openBrowser();
        await goto('http://localhost:3000'); 
    });

    after(async () => {
        await closeBrowser();
    });

    it('should navigate to right page', async () => {
        const pageTitle = await title();
        assert.equal(pageTitle, 'Angular TypeScript JumpStart App');
    });

    it('should let user login',async () => {
        await click('Login');
        await write('admin@customermanager.com',into(textBox(toRightOf('Email:'))));
        await write('password1234',into(textBox(toRightOf('Password:'))));
        await click('Login',below('Password:'));
        assert.ok(await text('Logout').exists());
    });

    it('should filter customers', async () => {
        await write('ted',into(textBox(below('Filter:'))));
        await press('Enter');
        assert.equal((await text('View Orders').get()).length,1); 
    });

    it('should let adding customer', async () => {
        await click('New Customer');
        await write('first name',into(textBox(below('First Name'))));
        await write('last name',into(textBox(below('Last Name'))));
        await write('address',into(textBox(below('Address'))));
        await write('city',into(textBox(below('City'))));
        await dropDown(below('State')).select('Alabama');
        await click('Insert');
        await click('3');
        assert.ok(await text('First name Last name').exists());
    });

    it('should let edit customer', async () => {
        await click('First name Last name');
        await click('Edit customer');
        await write('updated',into(textBox(below('First Name'))));
        await click('update');
        await click('Customer Details');
        assert.ok(await text('First nameupdated Last name').exists());
    });

    it('should let view customer order', async () => {
        await click('Customer Manager');
        await click(text('View Orders',below('Ted James')));
        assert.ok(await text('Basketball').exists());
        assert.ok(await text('Shoes').exists());
        assert.ok(await text('$207.98').exists());
    });

});