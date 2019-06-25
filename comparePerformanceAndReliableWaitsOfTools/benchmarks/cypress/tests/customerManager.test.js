context('test customer manager', () => {
    before(() => {
      cy.visit('/');
    });
  
    it('should navigate to right page', () => {
      cy.title().should('eq', 'Angular TypeScript JumpStart App');
    });

    it('should let user login',() => {
      cy.contains('Login').click();
      cy.get('input[name="email"]').type('admin@customermanager.com');
      cy.get('input[name="password"]').type('password1234');
      cy.get('button').contains('Login').click();
      cy.contains('Logout');
    });
    
    it('should filter customers', () => {
      cy.get('input[name="filter"]').type('ted{enter}');
      cy.get('.card').should('have.length', 1)
    });


    it('should let adding customer', () => {
      cy.contains('New Customer').click();
      cy.get('input[name="firstName"]').type('first name');
      cy.get('input[name="lastName"]').type('last name');
      cy.get('input[name="address"]').type('address');
      cy.get('input[name="city"]').type('city');
      cy.get('select[name="state"]').select('Alabama'); 
      cy.contains('Insert').click();
      cy.wait(2000); 
      // had to add wait as  cy.get('a', { timeout: 10000 }).contains('3').click(); 
      // and increasing defaultCommandTimeout to 10000 did not help 
      // https://github.com/cypress-io/cypress/issues/2113
      cy.get('a').contains('3').click();
      cy.contains(' First name Last name ');
    });

    it('should let edit customer', () => {
      cy.contains('First name Last name').click();
      cy.get('a[routerlink="edit"]').click();
      cy.get('input[name="firstName"]').type('updated');
      cy.get('button').contains('Update').click();
      cy.contains('Customer Details').click();
      cy.get('cm-customer-details h4').invoke('text').should('include', 'First nameupdated Last name');
    });

    it('should let view customer order',() => {
      cy.get('.app-title').click();
      cy.get('a[href="/customers/1/orders"]').contains('View Orders').click();
      cy.get('td').contains('Basketball');
      cy.get('td').contains('Shoes');
      cy.get('.summary-border .text-right').invoke('text').should('include', '$207.98');
    });

  }); 

  