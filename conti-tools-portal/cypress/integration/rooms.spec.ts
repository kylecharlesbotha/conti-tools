import { seedSqlBookings } from '../data/SeedBookingsDb';
import { SeedingProps } from '../support/SeedingProps';

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

describe('I am able to "Add" a New Room to a Location', () => {
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
    cy.get('input#name').type('Las Vegas');
  });

  it('And I see the text box with placeholder "Location Code"', () => {
    cy.get('input#code').should('be.visible');
  });

  it('And I insert a "Location Code" into the text box', () => {
    cy.get('input#code').type('LAS');
  });

  it('And I see the "Available" switch', () => {
    cy.get('.MuiFormControlLabel-root > .MuiTypography-root')
      .contains('Available')
      .should('be.visible');
  });

  it('And I see the header "Rooms" underneath the "Add Locations" section', () => {
    cy.get('body').contains('Rooms');
  });

  it('And I see the "+ New Room" button', () => {
    cy.get('.css-b7ckvb > .MuiButton-root').should('be.visible');
  });

  it('And I click the "+ New Room" button', () => {
    cy.get('.css-b7ckvb > .MuiButton-root').click();
  });

  it('And I see the text box with the placeholder "Room Name"', () => {
    cy.get('input#roomName').should('be.visible');
  });

  it('And I type a "Room Name" into the text box', () => {
    cy.get('input#roomName').type('LAS001');
  });

  it('And I see the text box with the placeholder "Capacity"', () => {
    cy.get('input#capacity').should('be.visible');
  });

  it('And I type a "Capacity" into the text box', () => {
    cy.get('input#capacity').clear().type('6');
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
    cy.get('[data-testid="row-3-cell-name"]').contains('Las Vegas');
  });

  it('And I see the number of available rooms increase', () => {
    cy.get('[data-testid="row-3-cell-roomsAvailable"]').contains('1');
  });
});

describe('I am able to see validation/error messages given I have inputed a Room Name that already exists and a Capacity that is a number less then 1', () => {
  before(() => {
    cy.visit('/locations');
    cy.get(
      '[data-testid="row-3-cell-editBtn"] > a > .MuiBox-root > .MuiButton-root'
    )
      .click()
      .then(() => {
        cy.get('.css-b7ckvb > .MuiButton-root').click();
      });
  });

  it('Given I have typed a Room Name that already exists into the the "Room Name" text box', () => {
    cy.get(
      '.css-1yuhvjn > .MuiGrid-container > :nth-child(1) > .css-q8hpuo-MuiFormControl-root > .MuiFormControl-root > .MuiFilledInput-root'
    ).type('LAS001');
  });

  it('I will see validation/error messages underneath the text box "Room Name"', () => {
    cy.get('.css-q8hpuo-MuiFormControl-root > .MuiTypography-root')
      .should('have.text', 'Room name must be unique')
      .then(() => {
        cy.get(
          '.css-1yuhvjn > .MuiGrid-container > :nth-child(1) > .css-q8hpuo-MuiFormControl-root > .MuiFormControl-root > .MuiFilledInput-root > #roomName'
        )
          .clear()
          .then(() => {
            cy.get(
              '.css-q8hpuo-MuiFormControl-root > .MuiTypography-root'
            ).should('have.text', 'A room name is required');
          });
      });
  });

  it('And I change the "Room Name" in the text box to something that doesnt already exist and not empty', () => {
    cy.get(
      '.css-1yuhvjn > .MuiGrid-container > :nth-child(1) > .css-q8hpuo-MuiFormControl-root > .MuiFormControl-root > .MuiFilledInput-root > #roomName'
    ).type('MUM002');
  });

  it('And I typed a Room Code Capacity that is less then 1 into the "Capacity" text box', () => {
    cy.get(
      '.css-1yuhvjn > .MuiGrid-container > :nth-child(2) > .css-q8hpuo-MuiFormControl-root > .MuiFormControl-root > .MuiFilledInput-root > #capacity'
    )
      .clear()
      .type('-2');
  });

  it('I will see validation/error messages underneath the text box "Capacity"', () => {
    cy.get('.css-q8hpuo-MuiFormControl-root > .MuiTypography-root')
      .should('have.text', 'Capacity must be a positive number')
      .then(() => {
        cy.get(
          '.css-1yuhvjn > .MuiGrid-container > :nth-child(2) > .css-q8hpuo-MuiFormControl-root > .MuiFormControl-root > .MuiFilledInput-root > #capacity'
        )
          .clear()
          .then(() => {
            cy.get(
              '.css-q8hpuo-MuiFormControl-root > .MuiTypography-root'
            ).should('have.text', 'A room capacity is required');
          });
      });
  });

  it('And I change the "Capacity" in the text box to something that is a positive number and not empty', () => {
    cy.get(
      '.css-1yuhvjn > .MuiGrid-container > :nth-child(2) > .css-q8hpuo-MuiFormControl-root > .MuiFormControl-root > .MuiFilledInput-root > #capacity'
    ).type('2');
  });
});

describe('I am able to disable and re-able a Room', () => {
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

  it('And I see the header "Rooms"', () => {
    cy.get('body').contains('Rooms');
  });

  it('And I see the "Available/Unavailable" switch', () => {
    cy.get(
      '.css-164r41r > .MuiGrid-container > .MuiGrid-grid-xs-true > .MuiBox-root > .MuiFormControlLabel-root'
    ).should('be.visible');
  });

  it('And I toggle the "Available/Unavailable" switch', () => {
    cy.get(
      '.css-164r41r > .MuiGrid-container > .MuiGrid-grid-xs-true > .MuiBox-root > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiSwitch-switchBase > .MuiSwitch-input'
    ).click();
  });

  it('And I select the "Update Location" button', () => {
    cy.get('.MuiButton-contained').click();
  });

  it('Then I am navigated to the "Locations" viewing page', () => {
    cy.url().should('include', '/locations');
    cy.get('header').contains('Locations');
  });

  it('And I see the number of available rooms either equal or less than the number of total rooms', () => {
    cy.get('[data-testid="row-0-cell-roomsAvailable"]').should('be.visible');
  });
});

describe('I am able to delete a Room', () => {
  before(() => {
    cy.visit('/locations');
  });

  it('Given I have a Location in the table', () => {
    cy.get('.MuiTable-root').should('be.visible');
  });

  it('When I select the "Edit" button within the table', () => {
    cy.get(
      '[data-testid="row-3-cell-editBtn"] > a > .MuiBox-root > .MuiButton-root'
    ).click();
  });

  it('And I am navigated to the "Manage Locations" page', () => {
    cy.url().should('include', '/locations/manage');
  });

  it('And I see the screen header "Edit Location"', () => {
    cy.get('body').contains('Edit Location');
  });

  it('And I see the header "Rooms"', () => {
    cy.get('body').contains('Rooms');
  });

  it('And I see the "Delete" icon', () => {
    cy.get('.MuiBox-root > .MuiIconButton-root').should('be.visible');
  });

  it('And I click the "Delete" icon', () => {
    cy.get('.MuiBox-root > .MuiIconButton-root').click();
  });

  it('And the room is no longer there', () => {
    cy.get(
      ':nth-child(1) > .css-q8hpuo-MuiFormControl-root > .MuiFormControl-root > .MuiFilledInput-root'
    ).should('not.exist');
  });

  it('And I select the "Update Location" button', () => {
    cy.get('.MuiButton-contained').click();
  });

  it('Then I am navigated to the "Locations" viewing page', () => {
    cy.url().should('include', '/locations');
    cy.get('header').contains('Locations');
  });

  it('And I see the number of available rooms is less then what it previously was', () => {
    cy.get('[data-testid="row-2-cell-roomsCount"]').contains('0');
  });
});
