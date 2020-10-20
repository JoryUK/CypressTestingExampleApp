const { expect } = require("chai");

describe("With a fresh cache", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      delay: 5000,
      url: /photos/
    });
  });

  it("Testing the final result is clean but will fail on empty cache", () => {
    cy.visit("/");

    cy.get('[alt="accusamus beatae ad facilis cum similique qui sunt"]').should($img => {
      // "naturalWidth" and "naturalHeight" are set when the image loads
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
  });

  it("Tests should pass more reliably the more things that are asserted", () => {
    cy.visit("/");

    cy.get('[alt="accusamus beatae ad facilis cum similique qui sunt"]')
      .should("be.visible")
      .should($img => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});
