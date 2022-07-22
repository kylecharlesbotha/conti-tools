describe('Testing navigation to home on the admin portal', () => {
  it('Should navigate to home page', () => {
    cy.visit('/').then(() => {
      cy.get('main').contains('Welcome to DBAS!');
    });
  });
});
