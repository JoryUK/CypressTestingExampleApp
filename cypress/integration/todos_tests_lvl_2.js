const { expect } = require("chai");

describe("ToDos Tests - Poorly Written", () => {
  beforeEach(() => {
    cy.server();
    localStorage.removeItem("todo-list");
  });

  it("Should display todos", () => {
    localStorage.setItem(
      "todo-list",
      JSON.stringify([
        { text: "Test Text", key: 0 },
        { text: "Testing Words", key: 1 }
      ])
    );

    cy.visit("/todos");

    cy.get(".todo").should("exist");
    cy.get(".todo").should("have.length", 2);
    cy.get(".todo").contains("Test Text").should("exist");
    cy.get(".todo").contains("Testing Words").should("exist");
  });

  it("Should allow not allow create of empty todo", () => {
    cy.visit("/todos");
    cy.get(".todo").should("not.exist");

    cy.get(".todo-add").click();
    cy.get(".todo").should("not.exist");
  });

  it("Should allow create of a new todos, and keep text if click add", () => {
    cy.visit("/todos");
    cy.get(".todo").should("not.exist");

    cy.get(".todo-form input").type("Test Text");
    cy.get(".todo-add").click();
    cy.get(".todo-form input").should("have.value", "Test Text");
    cy.get(".todo").should("exist");
    cy.get(".todo").should("have.length", 1);
    cy.get(".todo").contains("Test Text").should("exist");

    cy.get(".todo-form input").type(" 2");
    cy.get(".todo-add").click();
    cy.get(".todo").contains("Test Text 2").should("exist");
  });

  it("Should allow create of a new to do, and clear text if click add and clear", () => {
    cy.visit("/todos");
    cy.get(".todo").should("not.exist");

    cy.get(".todo-form input").type("Test Text");
    cy.get(".todo-addAndClear")
      .click()
      .then(() => {
        cy.get(".todo-form input").should("have.value", "");
        cy.get(".todo").should("exist");
        cy.get(".todo").should("have.length", 1);
        cy.get(".todo").contains("Test Text").should("exist");
      });

    cy.get(".todo-form input").type(" 2");
    cy.get(".todo-add")
      .click()
      .then(() => {
        cy.get(".todo").contains("Test Text 2").should("not.exist");
        cy.get(".todo").contains(" 2").should("exist");
      });
  });

  it("Should allow remove", () => {
    localStorage.setItem(
      "todo-list",
      JSON.stringify([
        { text: "Test Text 1 2", key: 0 },
        { text: "Test Something Else", key: 1 },
        { text: "Test Another Thing", key: 2 }
      ])
    );

    cy.visit("/todos");

    cy.get(".todo")
      .contains("Test Text 1 2")
      .should("exist")
      .within(() => {
        cy.get(".todo-remove").click();
      });
    cy.get(".todo").should("have.length", 2);
    cy.get(".todo").contains("Test Text 1 2").should("not.exist");
  });
});
