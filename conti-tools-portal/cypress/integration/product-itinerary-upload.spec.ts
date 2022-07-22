import SeedingProps from 'cypress/support/SeedingProps';
import { seedSqlBookings } from '../data/SeedBookingsDb';
import { seedSqlAuctions } from '../data/SeedAuctionsDb';

const bookingDbSeedProps: SeedingProps = {
  seedSql: seedSqlBookings,
  connectionConfig: Cypress.env('bookingDbConnectionConfig')
};

const auctionDbSeedProps: SeedingProps = {
  seedSql: seedSqlAuctions,
  connectionConfig: Cypress.env('auctionDbConnectionConfig')
};

describe('Testing navigation to "Product Itineraries" page', () => {
  before(() => {
    cy.task('execSql', auctionDbSeedProps);
    cy.task('execSql', bookingDbSeedProps);
  });
  it('Should navigate to Product Itineraries page', () => {
    cy.visit('/product-itineraries').then(() => {
      cy.get('header').contains('Product Itineraries');
    });
  });
  it('Should see the Sales Cycle drop down input', () => {
    cy.get('#sales-cycle-simple-select-filled').should('be.visible');
  });
  it('Should see the Search input field', () => {
    cy.get('#mui-1')
      .should('be.visible')
      .then(() => {
        cy.get('#mui-1-label');
      })
      .contains('Search');
  });
  it('Should see Product Itinerary table', () => {
    cy.get('table.MuiTable-root').should('be.visible');
  });
  it('Should see Upload Product Itineraries button', () => {
    cy.get('button.MuiButton-root').should('be.visible');
  });
});

describe('Testing navigation to Product Itineraries upload modal', () => {
  it('Should navigate to Product Itineraries upload modal', () => {
    cy.visit('/product-itineraries').then(() => {
      cy.get('header').contains('Product Itineraries');
      cy.contains('Upload Product Itineraries').click();
    });
  });
  it('Should see modal', () => {
    cy.get('div.MuiPaper-root').should('be.visible');
  });
  it('Should see "Upload Product Itineraries" heading', () => {
    cy.get('#mui-4').contains('Upload Product Itineraries');
  });
  it('Should see file upload zone', () => {
    cy.get('div.dropzone').should('be.visible');
  });
  it('Should see cancel button', () => {
    cy.get('button.MuiButton-text').should('be.visible');
  });
  it('Should see disabled upload button', () => {
    cy.get('.MuiDialogActions-root > button.MuiButton-contained').should(
      'be.disabled'
    );
  });
});

describe('Test upload to drop zone', () => {
  it('Working file upload test', () => {
    cy.viewport(1366, 768);
    cy.visit('/product-itineraries').then(() => {
      cy.get('header').contains('Product Itineraries');
      cy.get('.MuiButton-root')
        .contains('Upload Product Itineraries')
        .click()
        .then(() => {
          cy.get('div.dropzone').attachFile(
            './../resources/Viewing calendar.csv',
            {
              subjectType: 'drag-n-drop'
            }
          );
        });
    });
  });

  it('Should select a SalesCycle from the drop down', () => {
    cy.get('#demo-simple-select-filled')
      .click()
      .then(() => {
        cy.get('.MuiMenuItem-root').click();
      });
  });

  it('Should test that file is successfully added through drop zone', () => {
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
    cy.visit('/product-itineraries').then(() => {
      cy.get('header').contains('Product Itineraries');
      cy.contains('Upload Product Itineraries')
        .click()
        .then(() => {
          cy.get('div.dropzone').attachFile(
            './../resources/Viewing calendar.csv',
            {
              subjectType: 'drag-n-drop'
            }
          );
        })
        .then(() => {
          cy.get('#demo-simple-select-filled')
            .click()
            .then(() => {
              cy.get('.MuiMenuItem-root').click();
            });
        })
        .then(() => {
          cy.get('div.MuiDialogActions-root')
            .type('button')
            .contains('Upload')
            .click();
        })
        .then(() => {
          cy.get('div#notistack-snackbar')
            .contains('Product Itinerary uploaded successfully')
            .should('be.visible');
        });
    });
  });
});

describe('Test upload of invalid csv file', () => {
  it('Testing errors on invalid file upload', () => {
    cy.viewport(1366, 768);
    cy.visit('/product-itineraries').then(() => {
      cy.get('header').contains('Product Itineraries');
      cy.contains('Upload Product Itineraries')
        .click()
        .then(() => {
          cy.get('div.dropzone').attachFile(
            './../resources/Location altered Viewing calendar.csv',
            {
              subjectType: 'drag-n-drop'
            }
          );
        })
        .then(() => {
          cy.get('#demo-simple-select-filled')
            .click()
            .then(() => {
              cy.get('.MuiMenuItem-root').click();
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
