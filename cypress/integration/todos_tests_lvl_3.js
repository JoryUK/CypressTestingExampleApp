const { expect } = require("chai");
const element = {
  todo: ".todo",
  add: ".todo-add",
  addAndClear: ".todo-addAndClear",
  input: ".todo-form input",
  remove: ".todo-remove"
};

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

    cy.get(element.todo).should("exist");
    cy.get(element.todo).should("have.length", 2);
    cy.get(element.todo).contains("Test Text").should("exist");
    cy.get(element.todo).contains("Testing Words").should("exist");
  });

  it("Should allow not allow create of empty todo", () => {
    cy.visit("/todos");
    cy.get(element.todo).should("not.exist");

    cy.get(element.add).click();
    cy.get(element.todo).should("not.exist");
  });

  it("Should allow create of a new todos, and keep text if click add", () => {
    cy.visit("/todos");
    cy.get(element.todo).should("not.exist");

    cy.get(element.input).type("Test Text");
    cy.get(element.add).click();
    cy.get(element.input).should("have.value", "Test Text");
    cy.get(element.todo).should("exist");
    cy.get(element.todo).should("have.length", 1);
    cy.get(element.todo).contains("Test Text").should("exist");

    cy.get(element.input).type(" 2");
    cy.get(element.add).click();
    cy.get(element.todo).contains("Test Text 2").should("exist");
  });

  it("Should allow create of a new to do, and clear text if click add and clear", () => {
    cy.visit("/todos");
    cy.get(element.todo).should("not.exist");

    cy.get(element.input).type("Test Text");
    cy.get(element.addAndClear)
      .click()
      .then(() => {
        cy.get(element.input).should("have.value", "");
        cy.get(element.todo).should("exist");
        cy.get(element.todo).should("have.length", 1);
        cy.get(element.todo).contains("Test Text").should("exist");
      });

    cy.get(element.input).type(" 2");
    cy.get(element.add)
      .click()
      .then(() => {
        cy.get(element.todo).contains("Test Text 2").should("not.exist");
        cy.get(element.todo).contains(" 2").should("exist");
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

    cy.get(element.todo)
      .contains("Test Text 1 2")
      .should("exist")
      .within(() => {
        cy.get(element.remove).click();
      });
    cy.get(element.todo).should("have.length", 2);
    cy.get(element.todo).contains("Test Text 1 2").should("not.exist");
  });
});
