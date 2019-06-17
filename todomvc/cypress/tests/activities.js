context('test customer manager', () => {
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
  }); 

  