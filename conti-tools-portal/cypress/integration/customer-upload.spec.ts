import { seedSqlAuctions } from '../data/SeedAuctionsDb';
import { SeedingProps } from '../support/SeedingProps';

const auctionDbSeedProps: SeedingProps = {
  seedSql: seedSqlAuctions,
  connectionConfig: Cypress.env('auctionDbConnectionConfig')
};

describe('Testing navigation to customers page', () => {
  before(() => {
    cy.task('execSql', auctionDbSeedProps);
  });
  it('should navigate to customers page', () => {
    cy.visit('/customers').then(() => {
      cy.get('header').contains('Customers');
    });
  });
  it('should see Upload Customers button', () => {
    cy.get('button.MuiButton-root').should('be.visible');
  });
  it('should see Customers table', () => {
    cy.get('table.MuiTable-root').should('be.visible');
  });
});

describe('Testing navigation to customers upload modal', () => {
  it('should navigate to customers upload modal', () => {
    cy.visit('/customers').then(() => {
      cy.get('header').contains('Customers');
      cy.contains('Upload Customers').click();
    });
  });
  it('Should see modal', () => {
    cy.get('div.MuiPaper-root').should('be.visible');
  });
  it('Should see customers upload heading', () => {
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
    cy.visit('/customers').then(() => {
      cy.get('header').contains('Customers');
      cy.contains('Upload Customers')
        .click()
        .then(() => {
          cy.get('div.dropzone').attachFile(
            './../resources/Anonymised Customer Upload.csv',
            {
              subjectType: 'drag-n-drop'
            }
          );
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
    cy.visit('/customers').then(() => {
      cy.get('header').contains('Customers');
      cy.contains('Upload Customers')
        .click()
        .then(() => {
          cy.get('div.dropzone').attachFile(
            './../resources/Anonymised Customer Upload.csv',
            {
              subjectType: 'drag-n-drop'
            }
          );
        })
        .then(() => {
          cy.get('div.MuiDialogActions-root')
            .type('button')
            .contains('Upload')
            .click();
        })
        .then(() => {
          cy.get('div#notistack-snackbar')
            .contains('Customers CSV uploaded successfully')
            .should('be.visible');
        });
    });
  });
});

describe('Test upload of invalid csv file', () => {
  it('Testing errors on invalid file upload', () => {
    cy.viewport(1366, 768);
    cy.visit('/customers').then(() => {
      cy.get('header').contains('Customers');
      cy.contains('Upload Customers')
        .click()
        .then(() => {
          cy.get('div.dropzone').attachFile(
            './../resources/2021_06 FORMAT_PRODUCT UPLOAD 210614.csv',
            {
              subjectType: 'drag-n-drop'
            }
          );
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
