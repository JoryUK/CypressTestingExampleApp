/* eslint-disable no-undef */
describe("Waiting", () => {
  beforeEach(() => {
    cy.server();
  });
  it("You can write a very simple and effect test with default functionality", () => {
    cy.visit("/albums");
    cy.get(".album").should("exist");

    cy.get(".album").then(album => {
      cy.wrap(album).get(".photo").should("exist");
    });

    cy.get(".album")
      .should("exist")
      .then(album => {
        cy.wrap(album).get(".photo").should("exist");
      });
  });

  it("Cypress will timeout if the element is not available quickly enough, based on a retry timeout", () => {
    cy.visit("/albums");
    cy.get(".album", { timeout: 10 }).should("exist");
  });

  it("This can be unreliable, if network is slow or there are chained fetches involved etc, you can wait for extra time", () => {
    cy.visit("/albums");
    cy.wait(50);
    cy.get(".album", { timeout: 10 }).should("exist");
  });

  it("But waiting is also unreliable, and enforces a minimum run time for the test, it is much better to use an alias", () => {
    cy.route("GET", /albums/).as("fetch-all-albums-for-demo");
    cy.visit("/albums");
    cy.wait("@fetch-all-albums-for-demo");
    cy.get(".album", { timeout: 10 }).should("exist");
  });

  it("Bonus: An alias can even be used to mock the data, plus it can be used for uncoupled testing", () => {
    cy.route("GET", /albums/, [{ albumId: 1, title: "test testing testable" }]).as("fetch-all-dummy-data-for-demo");

    cy.visit("/albums");
    cy.wait("@fetch-all-dummy-data-for-demo");
    cy.get(".album", { timeout: 10 }).should("exist");

    cy.log("Check First letter of each word is capitalised");
    cy.contains("test").should("not.exist");
    cy.contains("Test Testing Testable").should("exist");
  });
});
