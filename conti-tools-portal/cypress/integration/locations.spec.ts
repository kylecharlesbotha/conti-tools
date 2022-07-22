import SeedingProps from 'cypress/support/SeedingProps';
import { seedSqlBookings } from '../data/SeedBookingsDb';

const bookingDbSeedProps: SeedingProps = {
  seedSql: seedSqlBookings,
  connectionConfig: Cypress.env('bookingDbConnectionConfig')
};

describe('I am able to navigate to the Location viewing screen', () => {
  before(() => {
    cy.task('execSql', bookingDbSeedProps);
    cy.visit('/');
  });
  it('When I select "Locations" from the navigation menu', () => {
    cy.get('[href="/locations"]').click();
  });
  it('Then I am navigated to the "Locations" viewing screen', () => {
    cy.url().should('include', '/locations');
  });
  it('And I see the screen title "Locations"', () => {
    cy.get('header').contains('Locations').should('be.visible');
  });
  it('And I see the search text box with the placeholder "Search" in it', () => {
    cy.get('input#mui-1').should('be.visible');
  });
  it('And I see the "Add New Location" button', () => {
    cy.get('a > .MuiButton-root').should('be.visible');
  });
  it('And I see the table with one of the column headers as "Available Rooms"', () => {
    cy.get(':nth-child(3) > .MuiTypography-root')
      .contains('Available Rooms')
      .should('be.visible');
  });
});
describe('I am able to "Search" for a Location using the search text box', () => {
  before(() => {
    cy.visit('/');
  });
  it('Given I have navigated to the "Locations" viewing screen', () => {
    cy.get('[href="/locations"]').click();
    cy.url().should('include', '/locations');
  });
  it('When the Locations table is displayed on the screen', () => {
    cy.get('.MuiTable-root').should('be.visible');
  });
  it('And I type a "Location Name" or "Location Code" in the search bar', () => {
    cy.get('input#mui-1').type('Antwerp');
  });
  it('Then I see the "Location" searched for displayed on the screen', () => {
    cy.get('.MuiTable-root').contains('Antwerp').should('be.visible');
  });
});
describe('I am able to navigate to the Add Locations screen', () => {
  before(() => {
    cy.visit('/');
  });
  it('When I select "Locations" from the navigation menu', () => {
    cy.get('[href="/locations"]').click();
  });
  it('Then I am navigated to the "Locations" viewing scree', () => {
    cy.url().should('include', '/locations');
  });
  it('And I see the screen title "Locations"', () => {
    cy.get('header').contains('Locations').should('be.visible');
  });
  it('And I see the "Add New Location" button', () => {
    cy.get('a > .MuiButton-root').should('be.visible');
  });
  it('Then I select the "Add New Location" button', () => {
    cy.get('a > .MuiButton-root').click();
  });
  it('Then I am navigated to the "Add Locations" screen', () => {
    cy.url().should('include', '/locations/manage');
  });
  it('And I see the screen header "Add Location"', () => {
    cy.get('body').contains('Add Location').should('be.visible');
  });
  it('And I see the "Save Location" button', () => {
    cy.get('.MuiButton-contained').should('have.text', 'Save Location');
  });
});
describe('I am able to "Add" a New Location', () => {
  before(() => {
    cy.visit('/');
  });
  it('Given I have navigated to the " Locations" screen', () => {
    cy.get('[href="/locations"]').click();
    cy.url().should('include', '/locations');
  });
  it('When I click the "Add New Location" button', () => {
    cy.get('a > .MuiButton-root').click();
  });
  it('And the "Add Location" screen opens up', () => {
    cy.get('body').contains('Add Location').should('be.visible');
  });
  it('And I see the text box with placeholder "Location Name"', () => {
    cy.get('input#name').should('be.visible');
  });
  it('And I insert a "Location Name" into the text box', () => {
    cy.get('input#name').type('London');
  });
  it('And I see the text box with placeholder "Location Code"', () => {
    cy.get('input#code').should('be.visible');
  });
  it('And I insert a "Location Code" into the text box', () => {
    cy.get('input#code').type('LDN');
  });
  it('And I see the "Available" switch', () => {
    cy.get('.MuiFormControlLabel-root > .MuiTypography-root')
      .contains('Available')
      .should('be.visible');
  });
  it('And I see the "Save Location" button', () => {
    cy.get('.MuiButton-contained').should('have.text', 'Save Location');
  });
  it('And I click the "Save Location" button', () => {
    cy.get('.MuiButton-contained').click();
  });
  it('Then I am navigated back to the "Locations" screen', () => {
    cy.url().should('include', '/locations');
    cy.get('header').contains('Locations');
  });
  it('And I see the new "Location" added to the table', () => {
    cy.get('[data-testid="row-3-cell-name"]').contains('London');
  });
});
describe('I am able to see validation/error messages given I have inputted a Location Name that already exists and a Location Code that already exists', () => {
  before(() => {
    cy.visit('/locations/manage');
  });
  it('Given I have typed a Location Name that already exists into the the "Location Name" text box', () => {
    cy.get('input#name').type('Antwerp');
  });
  it('And I typed a Location Code that already exists into the "Location Code" text box', () => {
    cy.get('input#code').type('ANT');
  });
  it('When I click the "Save Location" button', () => {
    cy.get('.MuiButton-contained').click();
  });
  it('I will see validation/error messages underneath the text box "Location Name"', () => {
    cy.get('#name-helper-text')
      .should('have.text', 'A location with that name already exists.')
      .then(() => {
        cy.get('input#name')
          .clear()
          .then(() => {
            cy.get('#name-helper-text').should(
              'have.text',
              'Location name is required.'
            );
          });
      });
  });
  it('And I change the "Location Name" in the text box to something that doesnt already exist and not empty', () => {
    cy.get('input#name').type('Pretoria');
  });
  it('And I click the "Save Location" button again', () => {
    cy.get('.MuiButton-contained').click();
  });
  it('I will see validation/error messages underneath the text box "Location Code"', () => {
    cy.get('#code-helper-text')
      .should('have.text', 'A location with that code already exists.')
      .then(() => {
        cy.get('input#code')
          .clear()
          .then(() => {
            cy.get('#code-helper-text').should(
              'have.text',
              'Location code is required.'
            );
          });
      });
  });
  it('And I change the "Location Code" in the text box to something that doesnt already exist and not empty', () => {
    cy.get('input#code').type('PTA');
  });
});
describe('I am able to disable and re-able a Location', () => {
  before(() => {
    cy.visit('/locations');
  });
  it('When I select the "Edit" button within the table', () => {
    cy.get(
      '[data-testid="row-0-cell-editBtn"] > a > .MuiBox-root > .MuiButton-root'
    ).click();
  });
  it('And I am navigated to the "Manage Locations" page', () => {
    cy.url().should('include', '/locations/manage');
  });
  it('And I see the screen header "Edit Location"', () => {
    cy.get('body').contains('Edit Location');
  });
  it('And I see the "Available/Unavailable" switch', () => {
    cy.get(
      '.MuiGrid-spacing-xs-2 > .MuiGrid-grid-xs-true > .MuiBox-root'
    ).should('be.visible');
  });
  it('And I toggle the "Available/Unavailable" switch', () => {
    cy.get(
      '.MuiGrid-spacing-xs-2 > .MuiGrid-grid-xs-true > .MuiBox-root > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiSwitch-switchBase > .MuiSwitch-input'
    ).click();
  });
  it('And I select the "Update Location" button', () => {
    cy.get('.MuiButton-contained')
      .click()
      .then(() => {
        cy.get('.SnackbarContent-root').contains('Added location');
      });
  });
  it('Then I am navigated to the "Locations" viewing page', () => {
    cy.url().should('include', '/locations');
    cy.get('header').contains('Locations');
  });
  it('And I see Status of the "Location" that I updated to either "Available/Unavailable"', () => {
    cy.get('[data-testid="row-2-cell-isAvailable"]').contains('Available');
  });
});
