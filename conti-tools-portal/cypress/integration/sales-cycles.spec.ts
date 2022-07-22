import { seedSqlAuctions } from '../data/SeedAuctionsDb';
import { SeedingProps } from '../support/SeedingProps';

const auctionDbSeedProps: SeedingProps = {
  seedSql: seedSqlAuctions,
  connectionConfig: Cypress.env('auctionDbConnectionConfig')
};

describe('Testing navigation to sales cycles screen', () => {
  before(() => {
    cy.task('execSql', auctionDbSeedProps);
  });
  it('should navigate to sales cycles page', () => {
    cy.visit('/sales-cycles').then(() => {
      cy.get('header').contains('Sales Cycles');
    });
  });
  it('should see new sales cycle button', () => {
    cy.get('button.MuiButton-root').should('be.visible');
  });
  it('should see sales cycles table', () => {
    cy.get('table.MuiTable-root').should('be.visible');
  });
});

describe('I am able to navigate to the "New Sales Cycle" modal from the Sales Cycles viewing page', () => {
  it('Should see Sales Cycles page header', () => {
    cy.get('header').contains('Sales Cycles');
    cy.contains('NEW SALES CYCLE').click();
  });

  it('Should see New Sales Cycle Header', () => {
    cy.get('#mui-3 > .MuiTypography-root').should('be.visible');
  });
  it('Should see sales cycle name input field', () => {
    cy.get('input#salesCycleName').should('be.visible');
  });
  it('Should see start date input field', () => {
    cy.get('input#startDate').should('be.visible');
  });
  it('Should see end date input field', () => {
    cy.get('input#endDate').should('be.visible');
  });
  it('Should see cancel button', () => {
    cy.get('button.MuiButton-text').should('be.visible');
  });
  it('Should see Save button', () => {
    cy.get('.MuiDialogActions-root > button.MuiButton-contained').should(
      'be.visible'
    );
  });
});

describe('I am able to create a new sales cycle from the "New Sales Cycle" modal', () => {
  it('should navigate to create sales cycles modal', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/SalesCycles',
        hostname: 'localhost'
      },
      (req) => {
        req.continue((res) => {
          expect(res.statusCode).equal(200);
        });
      }
    );
    cy.visit('/sales-cycles').then(() => {
      cy.get('header').contains('Sales Cycles');
      cy.contains('NEW SALES CYCLE')
        .click()
        .then(() => {
          const r = (Math.random() + 1).toString(36).substring(2, 4);
          cy.get('input#salesCycleName').type('2022_' + r);
        })
        .then(() => {
          cy.get('input#startDate').clear().type('04/05/2023');
        })
        .then(() => {
          cy.get('input#endDate').clear().type('04/06/2024');
        })
        .then(() => {
          cy.contains('Save').click();
        })
        .then(() => {
          cy.get('div#notistack-snackbar').contains('Added sales cycle');
        });
    });
  });
});

describe('I am not able to create a new sales cycle when the end date is before the start date', () => {
  it('should navigate to create sales cycles modal', () => {
    cy.visit('/sales-cycles').then(() => {
      cy.get('header').contains('Sales Cycles');
      cy.contains('NEW SALES CYCLE')
        .click()
        .then(() => {
          const r = (Math.random() + 1).toString(36).substring(2, 4);
          cy.get('input#salesCycleName').type('2022_' + r);
        })
        .then(() => {
          cy.get('input#startDate').clear().type('04/05/2021');
        })
        .then(() => {
          cy.get('input#endDate').clear().type('04/05/2020');
        })
        .then(() => {
          cy.get('div.MuiDialogActions-root').click();
          cy.get('#endDate-helper-text').contains(
            'End date must be after start date'
          );
        });
    });
  });
  it('Save button shouold be disabled', () => {
    cy.get('.MuiDialogActions-root > button.MuiButton-contained').should(
      'be.disabled'
    );
  });
});

describe('I am able to navigate to the update sales cycle modal', () => {
  it('should navigate to sales cycle update modal', () => {
    cy.visit('/sales-cycles').then(() => {
      cy.get('header')
        .contains('Sales Cycles')
        .then(() => {
          cy.get(
            '[data-testid="row-0-cell-editBtn"] > .MuiBox-root > .MuiButton-root'
          ).click();
        });
    });
  });
  it('Should see update sales cycle modal', () => {
    cy.get('div.MuiPaper-root').should('be.visible');
  });
  it('Should see New Sales Cycle modal heading', () => {
    cy.get('div.MuiPaper-root').should('be.visible');
  });
  it('Should see disabled sales cycle name input', () => {
    cy.get('input#salesCycleName').should('be.disabled');
  });
  it('Should see start date input', () => {
    cy.get('#startDate').should('be.visible');
  });
  it('Should see end date input', () => {
    cy.get('#endDate').should('be.visible');
  });
  it('Should see cancel button', () => {
    cy.get('.MuiDialogActions-root > .MuiButton-text').should('be.visible');
  });
  it('Should see update button (disabled)', () => {
    cy.get('.MuiDialogActions-root > button.MuiButton-contained').should(
      'be.disabled'
    );
  });
});

describe('I am able to update a existing sales cycle', () => {
  it('should navigate to sales cycle update modal', () => {
    cy.visit('/sales-cycles').then(() => {
      cy.get('header')
        .contains('Sales Cycles')
        .then(() => {
          cy.get(
            '[data-testid="row-0-cell-editBtn"] > .MuiBox-root > .MuiButton-root'
          ).click();
        });
    });
  });
  it('Should enter valid start date', () => {
    cy.get('input#startDate').clear().type('04/05/2021');
  });
  it('Should enter valid end date', () => {
    cy.get('input#startDate').clear().type('04/06/2021');
  });
  it('Should click update and a sales cycle is then successfully updated', () => {
    cy.get('.MuiDialogActions-root > button.MuiButton-contained').click();
  });
  it('Should have succesfully updated sales cycle', () => {
    cy.get('div#notistack-snackbar').contains('Updated sales cycle');
  });
});

describe('I am not able to update a existing sales cycle with invalid dates', () => {
  it('should navigate to sales cycle update modal', () => {
    cy.visit('/sales-cycles').then(() => {
      cy.get('header')
        .contains('Sales Cycles')
        .then(() => {
          cy.get(
            '[data-testid="row-0-cell-editBtn"] > .MuiBox-root > .MuiButton-root'
          ).click();
        });
    });
  });
  it('Should enter invalid end date', () => {
    cy.get('input#startDate').clear().type('05/05/2020');
  });
  it('Should enter invalid start date', () => {
    cy.get('input#endDate').clear().type('01/01/2020');
  });

  it('Should see error message on form and not be able to submit', () => {
    cy.get('div.MuiDialogActions-root').click();
    cy.get('#endDate-helper-text').contains(
      'End date must be after start date'
    );
  });
  it('Update button should be disabled', () => {
    cy.get('.MuiDialogActions-root > button.MuiButton-contained').should(
      'be.disabled'
    );
  });
});
