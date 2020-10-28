/* eslint-disable no-undef */
describe("Flow of Control", () => {
  beforeEach(() => {
    cy.server();
  });

  it("Uses a mixture promises and synchronous library methods", () => {
    cy.visit("/albums").then(() => {
      cy.log("1");
    });
    cy.log("2");
    cy.get(".album")
      .should("exist")
      .then(() => {
        cy.log("3");
      });
    cy.log("4");
    cy.wait(50).then(() => {
      cy.log("5");
    });
    cy.log("6");
  });

  it("Either use 'then' often/always", () => {
    cy.visit("/albums").then(() => {
      cy.log("1");
      cy.log("2");
      cy.get(".album")
        .should("exist")
        .then(() => {
          cy.log("3");
          cy.log("4");
          cy.wait(50).then(() => {
            cy.log("5");
            cy.log("6");
          });
        });
    });
  });

  it("or avoid it, depending upon style, ", () => {
    cy.visit("/albums");
    cy.log("1");
    cy.log("2");
    cy.get(".album").should("exist");
    cy.log("3");
    cy.log("4");
    cy.wait(50);
    cy.log("5");
    cy.log("6");
  });
});
