context('test todo mvc activities', () => {
    before(() => {
      cy.visit('/');
    });

    it('should clear completed tasks',() => {
        cy.get('input[placeholder="What needs to be done?"]').type('Demo');
        cy.get('input[placeholder="What needs to be done?"]').type('{Enter}');
        cy.contains('1 item left')

        cy.get('input[class="toggle"]').click()
        cy.contains('0 items left')
    });

    it('should mark task as complete', async () => {
      cy.get('input[placeholder="What needs to be done?"]').type('Compelete Task');
      cy.get('input[placeholder="What needs to be done?"]').type('{Enter}');

      cy.contains('1 item left')
      cy.contains('Active').click()
      cy.contains('Complete Task')

      cy.get('input[class="toggle"]').click()
      cy.contains('0 items left')

      cy.contains('Active').click()
      
      //assert.ok(!(await text('Complete Task').exists()));
  });

  it('should list active tasks', async () => {
    cy.get('input[placeholder="What needs to be done?"]').type('Active Task');
    cy.get('input[placeholder="What needs to be done?"]').type('{Enter}');

    cy.get('input[placeholder="What needs to be done?"]').type('Compeleted Task');
    cy.get('input[placeholder="What needs to be done?"]').type('{Enter}');

    cy.contains('2 items left')
    cy.get('input[class="toggle"]').click()

    cy.contains('All').click()
    cy.contains('2 items left')

    cy.contains('Active').click()
    cy.contains('1 item left')
//      assert.ok(!(await text('Completed Task').exists()));
  });

  it('should list completed tasks', async () => {
    cy.get('input[placeholder="What needs to be done?"]').type('Compelete Task');
    cy.get('input[placeholder="What needs to be done?"]').type('{Enter}');

    cy.contains('1 item left')
    cy.contains('Active').click()
    cy.contains('Completed Task')

    cy.get('input[class="toggle"]').click()
    cy.contains('0 items left')

    cy.contains('Completed').click()
    cy.contains('1 item left')
  });

  it('should clear completed tasks', async () => {
    cy.get('input[placeholder="What needs to be done?"]').type('Clear Task');
    cy.get('input[placeholder="What needs to be done?"]').type('{Enter}');

    cy.contains('1 item left')
    cy.get('input[class="toggle"]').click()
    cy.contains('0 items left')

    cy.contains('Clear completed').click()
    // assert.ok(!(await text('Clear Task').exists()));
  });

  // it('should remove task', async () => {
  //   cy.get('input[placeholder="What needs to be done?"]').type('Remove Task');
  //   cy.get('input[placeholder="What needs to be done?"]').type('{Enter}');

  //   cy.contains('1 item left')
  //   //hover is currently not supported in Cypress. Should try with alternatives
  // });
  }); 

  