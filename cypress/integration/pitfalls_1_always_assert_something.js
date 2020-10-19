const { expect } = require("chai");

describe("With a fresh cache", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      delay: 5000,
      url: /photos/
    });
  });

  it("Many assertions are not necessary", () => {
    cy.visit("/");

    cy.get('[alt="accusamus beatae ad facilis cum similique qui sunt"]').should($img => {
      // "naturalWidth" and "naturalHeight" are set when the image loads
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
  });

  it("Tests will sometimes pass if the code runs fast enough", () => {
    cy.visit("/");

    cy.get('[alt="accusamus beatae ad facilis cum similique qui sunt"]')
      .should("be.visible")
      .should($img => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});
