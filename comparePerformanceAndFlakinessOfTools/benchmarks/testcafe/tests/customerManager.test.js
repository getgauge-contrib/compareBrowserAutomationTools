import { Selector } from 'testcafe';

fixture `test customer manager`
    .page `http://localhost:3000`;

test('should have the right title', async (t) => {
    await t.expect(Selector("title").innerText).eql('Angular TypeScript JumpStart App')
});

test('should let user login',async (t) => {
    await t.click(Selector('*').withExactText('Login'));
    await t.typeText(Selector('input[name="email"]'),'admin@customermanager.com');
    await t.typeText(Selector('input[name="password"]'),'password1234');
    await t.click(Selector('button').withText('Login'));
    await t.expect(await Selector('*').withExactText('Logout').exists).ok();
});

test('should filter customers', async (t) => {
    await t.typeText(Selector('input[name="filter"]'),'ted');
    await t.pressKey('enter');
    await t.expect(await Selector('.card').count).eql(1);
});

test('should let adding customer', async (t) => {
    await t.click(Selector('a').withText('New Customer'));
    await t.typeText(Selector('input[name="email"]'),'admin@customermanager.com');
    await t.typeText(Selector('input[name="password"]'),'password1234');
    await t.click(Selector('button').withText('Login'));
    await t.typeText(Selector('input[name="firstName"]'),'first name');
    await t.typeText(Selector('input[name="lastName"]'),'last name');
    await t.typeText(Selector('input[name="address"]'),'address');
    await t.typeText(Selector('input[name="city"]'),'city');
    await t.click(Selector('select[name="state"]'));
    await t.click(await (Selector('select[name="state"]').find('option')).withText('Alabama'));
    await t.click(Selector('button').withText('Insert'));
    await t.click(Selector('a').withText('3'));
    await t.expect(await Selector('*').withText('First name Last name').exists).ok();
});

test('should let edit customer', async (t) => {
    await t.click(Selector('a').withText('3'));
    await t.click(Selector('a').withText('First name Last name'));
    await t.click(Selector('a[routerlink="edit"]'));
    await t.typeText(Selector('input[name="email"]'),'admin@customermanager.com');
    await t.typeText(Selector('input[name="password"]'),'password1234');
    await t.click(Selector('button').withText('Login'));
    await t.typeText(Selector('input[name="firstName"]'),'updated');
    await t.click(Selector('button').withText('Update'));
    await t.click(Selector('a').withText('Customer Details'));
    await t.expect(await Selector('*').withText('First nameupdated Last name').exists).ok();
});

test('should let view customer order', async (t) => {
    await t.click(Selector('a[href="/customers/1/orders"]'));
    await t.expect(await Selector(('tbody > tr:nth-child(1) > td:nth-child(1)')).innerText).eql('Basketball');
    await t.expect(await Selector(('tbody > tr:nth-child(2) > td:nth-child(1)')).innerText).eql('Shoes');
    await t.expect(await Selector(('.summary-border td:nth-child(2)')).innerText).eql('$207.98');
});