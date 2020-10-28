/* eslint-disable no-undef */
describe("ToDos Tests - Poorly Written", () => {
  beforeEach(() => {
    cy.server();
    localStorage.removeItem("todo-list");
  });

  it("Should allow create, remove and support display", () => {
    cy.visit("/todos");
    cy.get(".todo").should("not.exist");
    //should not add empty
    cy.get("button").contains("+").click();
    cy.get(".todo").should("not.exist");
    //should add one
    cy.get(".todo-form input").type("Test Text");
    cy.get("button").contains("+").click();
    cy.get(".todo-form input").should("have.value", "Test Text");
    cy.get(".todo").should("exist");
    cy.get(".todo").should("have.length", 1);
    //should add multiple
    cy.get(".todo-form input").type(" 1");
    cy.get("button").contains("+").click();
    cy.get(".todo-form input").type(" 2");
    //should clear after add and clear
    cy.get("button").contains("+/C").click();
    cy.get(".todo").should("have.length", 3);
    cy.get(".todo-form input").should("have.value", "");
    //should allow delete
    cy.get(".todo")
      .contains("Test Text 1 2")
      .should("exist")
      .within(() => {
        cy.get("a").click();
      });
    cy.get(".todo").should("have.length", 2);
    cy.get(".todo").contains("Test Text 1 2").should("not.exist");
  });
});
