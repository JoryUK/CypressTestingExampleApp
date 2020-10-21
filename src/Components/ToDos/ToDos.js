import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  // Input tracker
  let input;
  const doAdd = () => {
    if (input.value) {
      addTodo(input.value);
    }
  };
  const doAddAndClear = () => {
    doAdd();
    input.value = "";
  };
  return (
    <div className="todo-form">
      <input
        ref={node => {
          input = node;
        }}
      />
      <button className="todo-add" onClick={doAdd}>
        +
      </button>
      <button className="todo-addAndClear" onClick={doAddAndClear}>
        +/C
      </button>
    </div>
  );
};

const Todo = ({ todo, remove }) => {
  const doRemove = e => {
    e.preventDefault();
    remove(todo.key);
  };
  // Each Todo
  return (
    <li className="todo">
      {todo.text}
      <a href="{#}" className="todo-remove" onClick={doRemove}>
        remove
      </a>
    </li>
  );
};

const TodoList = ({ todos, remove }) => {
  // Map through the todos
  const todoNode = todos.map(todo => {
    return <Todo todo={todo} key={todo.key} remove={remove} />;
  });
  return <ul>{todoNode}</ul>;
};

export const ToDos = () => {
  let key = parseInt(localStorage.getItem("todo-list-key")) || 0;
  const saved = localStorage.getItem("todo-list");
  const [toDos, setToDos] = useState((saved && JSON.parse(saved)) || []);
  const addTodo = val => {
    const newList = [{ text: val, key: key++ }].concat(toDos);
    console.log("ToDos -> newList", newList);
    if (newList.length > toDos.length) {
      setToDos(newList);
      localStorage.setItem("todo-list-key", key);
      localStorage.removeItem("todo-list");
      localStorage.setItem("todo-list", JSON.stringify(newList));
    }
  };
  // Handle remove
  const handleRemove = key => {
    toDos.splice(
      toDos.findIndex(todo => todo.key === key),
      1
    );
    const newList = [].concat(toDos);
    console.log("ToDos -> newList", newList);
    setToDos(newList);
    localStorage.removeItem("todo-list");
    localStorage.setItem("todo-list", JSON.stringify(newList));
  };

  // Render JSX
  return (
    <div className="todo-list">
      <h1>To Do Application</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={toDos} remove={handleRemove} />
    </div>
  );
};
