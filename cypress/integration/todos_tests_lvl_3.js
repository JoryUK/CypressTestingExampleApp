/* eslint-disable no-undef */
const element = {
  todo: "[data-cy=todo]",
  add: "[data-cy=todo-add]",
  addAndClear: "[data-cy=todo-addAndClear]",
  input: "[data-cy=todo-input]",
  remove: "[data-cy=todo-remove]"
};

Cypress.Commands.add("goToDo", arrayOfExistingValues => {
  if (!arrayOfExistingValues) arrayOfExistingValues = [];
  let key = 0;
  localStorage.removeItem("todo-list");
  localStorage.setItem(
    "todo-list",
    JSON.stringify(
      arrayOfExistingValues.map(item => {
        return { text: item, key: key++ };
      })
    )
  );
  localStorage.setItem("todo-list-key", key);

  cy.visit("/todos");
});

describe("ToDos Tests - Poorly Written", () => {
  beforeEach(() => {
    cy.server();
  });

  it("Should display todos", () => {
    const testArray = ["Test Text", "Testing Words", "Testing Sentence", "Some Other Test"];
    for (let index = 0; index < 20; index++) {
      testArray.push("Test Item: " + index);
    }
    cy.goToDo(testArray);

    cy.get(element.todo).should("have.length", testArray.length);
    for (const test of testArray) {
      cy.get(element.todo).contains(test).should("exist");
    }
  });

  it("Should allow not allow create of empty todo", () => {
    cy.goToDo();
    cy.get(element.todo).should("not.exist");

    cy.get(element.add).click();
    cy.get(element.todo).should("not.exist");
  });

  it("Should allow create of a new todos, and keep text if click add", () => {
    cy.goToDo();
    cy.get(element.todo).should("not.exist");

    cy.get(element.input).type("Test Text");
    cy.get(element.add)
      .click()
      .then(() => {
        cy.get(element.input).should("have.value", "Test Text");
        cy.get(element.todo).should("have.length", 1);
        cy.get(element.todo).contains("Test Text").should("exist");
      });

    cy.get(element.input).type(" 2");
    cy.get(element.add)
      .click()
      .then(() => {
        cy.get(element.todo).contains("Test Text 2").should("exist");
      });
  });

  it("Should allow create of a new to do, and clear text if click add and clear", () => {
    cy.goToDo();
    cy.get(element.todo).should("not.exist");

    cy.get(element.input).type("Test Text");
    cy.get(element.addAndClear)
      .click()
      .then(() => {
        cy.get(element.input).should("have.value", "");
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
    const testArray = ["Test Text 1 2", "Test Something Else", "Test Another Thing"];

    cy.goToDo(testArray);

    cy.get(element.todo)
      .contains(testArray[0])
      .should("exist")
      .within(() => {
        cy.get(element.remove).click();
      });
    cy.get(element.todo).should("have.length", 2);
    cy.get(element.todo).contains(testArray[0]).should("not.exist");
    for (let index = 1; index < testArray.length; index++) {
      cy.get(element.todo).contains(testArray[index]).should("exist");
    }
  });
});
