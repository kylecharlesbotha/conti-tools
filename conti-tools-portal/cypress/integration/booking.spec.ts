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

describe('Testing navigation to Bookings screen', () => {
  before(() => {
    cy.task('execSql', auctionDbSeedProps);
    cy.task('execSql', bookingDbSeedProps);
  });
  it('should navigate to Bookings page', () => {
    cy.visit('/bookings').then(() => {
      cy.get('header').contains('Bookings');
    });
  });

  it('should see the Sales Cycle drop down input', () => {
    cy.get('#sales-cycle-simple-select-filled').should('be.visible');
  });

  it('should see the Location drop down input', () => {
    cy.get('#location-simple-select-filled').should('be.visible');
  });

  it('should see the Start Date input and should be read only', () => {
    cy.get('#booking-start-date')
      .should('be.visible')
      .should('have.attr', 'readonly');
  });

  it('should see the End Date input and should be read only', () => {
    cy.get('#booking-end-date')
      .should('be.visible')
      .should('have.attr', 'readonly');
  });

  it('should see a helper message indicating to select a sales cycle and location', () => {
    cy.contains(
      'Select a Sales Cycle and Location to view available booking dates'
    );
  });
});

describe('Testing viewing available booking dates', () => {
  it('should navigate to bookings and select a sales cycle and location', () => {
    cy.visit('/bookings').then(() => {
      cy.get('#sales-cycle-simple-select-filled')
        .parent()
        .click()
        .get('ul')
        .contains('2022_03')
        .click()
        .then(() => {
          cy.get('#location-simple-select-filled')
            .parent()
            .click()
            .get('ul')
            .contains('Antwerp')
            .click()
            .then(() => {
              cy.get('#booking-start-date').should('have.value', '01/01/2022');
              cy.get('#booking-end-date').should('have.value', '12/01/2022');
              cy.get('li.react-multi-carousel-item').should('have.length', 335);
              cy.get('li.react-multi-carousel-item')
                .first()
                .should('have.class', 'react-multi-carousel-item--active');
            });
        });
    });
  });
});

describe('Testing create, edit and delete new booking', () => {
  before(() => {
    cy.task('execSql', bookingDbSeedProps);
    cy.visit('/bookings').then(() => {
      cy.get('#sales-cycle-simple-select-filled')
        .parent()
        .click()
        .get('ul')
        .contains('2022_03')
        .click()
        .then(() => {
          cy.get('#location-simple-select-filled')
            .parent()
            .click()
            .get('ul')
            .contains('Antwerp')
            .click();
        });
    });
  });

  describe('Should edit a bookings customer and end time', () => {
    it('should click on the only booking and navigate to edit bookings screen', () => {
      cy.contains('4 CS Ltd')
        .click()
        .then(() => {
          cy.url().should('contain', '/bookings/edit');
        });
    });

    it('should find the customer input and change it to 4G GEMS', () => {
      cy.get('#customer-autocomplete')
        .should('have.value', '4 CS Ltd')
        .click()
        .get('div[role="presentation"] ul')
        .contains('4G GEMS')
        .click()
        .then(() => {
          cy.get('#customer-autocomplete').should('have.value', '4G GEMS');
        });
    });

    it('should change the number of guests to 2', () => {
      cy.get('#noOfGuests')
        .should('have.value', 1)
        .clear()
        .type('2')
        .should('have.value', 2);
    });

    it('should change the end time to 1:00 pm', () => {
      cy.get('#end')
        .should('have.value', '12:00 pm')
        .clear()
        .type('01:00 pm')
        .should('have.value', '01:00 pm');
    });

    it('should successfully save and redirect to bookings when Save is clicked', () => {
      cy.get('button[type="submit"]')
        .click()
        .then(() => {
          cy.url().should('contain', 'bookings?');
        });
    });

    it('should show the edited event with the new customer and times', () => {
      cy.contains('4G GEMS (2 guests)');
      cy.contains('10:00 AM – 1:00 PM');
    });
  });

  describe('Should successfully delete a booking', () => {
    it('should find the booking and click it to navigate to the edit screen', () => {
      cy.contains('4G GEMS (2 guests)')
        .click()
        .then(() => {
          cy.url().should('contain', '/bookings/edit');
        });
    });

    it('should click "Cancel Booking"', () => {
      cy.contains('Cancel Booking').click();
    });

    it('should navigate back to bookings and should display no events', () => {
      cy.get('.rbc-event').should('have.length', 0);
    });
  });
});
