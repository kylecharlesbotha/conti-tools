import SeedingProps from 'cypress/support/SeedingProps';
import { seedSqlAuctions } from '../data/SeedAuctionsDb';

const auctionDbSeedProps: SeedingProps = {
  seedSql: seedSqlAuctions,
  connectionConfig: Cypress.env('auctionDbConnectionConfig')
};

describe('Testing navigation to "Products" page', () => {
  before(() => {
    cy.task('execSql', auctionDbSeedProps);
  });
  it('Should navigate to Products page', () => {
    cy.visit('/products').then(() => {
      cy.get('header').contains('Products');
    });
  });
  it('Should see Upload Products button', () => {
    cy.get('button.MuiButton-root').should('be.visible');
  });
  it('Should see Products table', () => {
    cy.get('table.MuiTable-root').should('be.visible');
  });
});
describe('Testing navigation to products upload modal', () => {
  it('should navigate to products upload modal', () => {
    cy.visit('/products').then(() => {
      cy.get('header')
        .contains('Products')
        .then(() => {
          cy.get('.MuiButton-root').click();
        });
    });
  });
  it('Should see modal', () => {
    cy.get('div.MuiPaper-root').should('be.visible');
  });
  it('Should see Products upload heading', () => {
    cy.get('#mui-4').should('be.visible');
  });
  it('Should see file upload zone', () => {
    cy.get('div.dropzone').should('be.visible');
  });
  it('Should see cancel button', () => {
    cy.get('button.MuiButton-text').should('be.visible');
  });
  it('Should see upload button', () => {
    cy.get('.MuiDialogActions-root > button.MuiButton-contained').should(
      'be.disabled'
    );
  });
});
describe('Test upload to drop zone', () => {
  it('Working file upload test', () => {
    cy.viewport(1366, 768);
    cy.visit('/products').then(() => {
      cy.get('header').contains('Products');
      cy.contains('Upload Products')
        .click()
        .then(() => {
          cy.get('div.dropzone')
            .attachFile('./../resources/Product Upload.csv', {
              subjectType: 'drag-n-drop'
            })
            .then(() => {
              cy.get(
                '.MuiDialogContent-root > .MuiFormControl-root > .MuiFilledInput-root > #demo-simple-select-filled'
              )
                .click()
                .then(() => {
                  cy.get('.MuiMenuItem-root').click();
                });
            });
        });
    });
  });
  it('Test that file is succesfully added through drop zone', () => {
    cy.get('.MuiTypography-root > .MuiButtonBase-root').should('be.visible');
  });
  it('Should see cancel button', () => {
    cy.get('button.MuiButton-text').should('be.visible');
  });
  it('Should see upload button', () => {
    cy.get('.MuiDialogActions-root > button.MuiButton-contained')
      .should('be.visible')
      .should('be.enabled');
  });
});
describe('Test upload of valid csv file', () => {
  it('Testing successful valid file upload', () => {
    cy.viewport(1366, 768);
    cy.visit('/products').then(() => {
      cy.get('header').contains('Products');
      cy.contains('Upload Products')
        .click()
        .then(() => {
          cy.get('div.dropzone')
            .attachFile('./../resources/Product Upload.csv', {
              subjectType: 'drag-n-drop'
            })
            .then(() => {
              cy.get(
                '.MuiDialogContent-root > .MuiFormControl-root > .MuiFilledInput-root > #demo-simple-select-filled'
              )
                .click()
                .then(() => {
                  cy.get('.MuiMenuItem-root').click();
                });
            });
        })
        .then(() => {
          cy.get('div.MuiDialogActions-root')
            .type('button')
            .contains('Upload')
            .click();
        });
    });
  });
});
describe('Test upload of invalid csv file', () => {
  it('Testing errors on invalid file upload', () => {
    cy.viewport(1366, 768);
    cy.visit('/products').then(() => {
      cy.get('header').contains('Products');
      cy.contains('Upload Products')
        .click()
        .then(() => {
          cy.get('div.dropzone')
            .attachFile('./../resources/Broken Product Upload.csv', {
              subjectType: 'drag-n-drop'
            })
            .then(() => {
              cy.get(
                '.MuiDialogContent-root > .MuiFormControl-root > .MuiFilledInput-root > #demo-simple-select-filled'
              )
                .click()
                .then(() => {
                  cy.get('.MuiMenuItem-root').click();
                });
            });
        })
        .then(() => {
          cy.get('div.MuiDialogActions-root')
            .type('button')
            .contains('Upload')
            .click();
        });
    });
  });
  it('Should be able to see errors table heading', () => {
    cy.get('.css-dic6en > .MuiTypography-root')
      .contains('The following errors were found in the file:')
      .should('be.visible');
  });
  it('Should see errors table', () => {
    cy.get('table.MuiTable-root.css-w1htiv-MuiTable-root').should('be.visible');
  });
  it('Should see cancel button', () => {
    cy.get('button.MuiButton-text').should('be.visible');
  });
  it('Should see upload button', () => {
    cy.get('.MuiDialogActions-root > button.MuiButton-contained').should(
      'be.disabled'
    );
  });
});
