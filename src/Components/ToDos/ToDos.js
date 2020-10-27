import { Box, Button, Grid, IconButton, InputBase } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import QueueIcon from "@material-ui/icons/Queue";
import SendIcon from "@material-ui/icons/Send";
import { AlertTitle } from "@material-ui/lab";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import styles from "./ToDos.module.css";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = React.useState("");
  const handleChange = event => {
    setValue(event.target.value);
  };

  const doAdd = () => {
    if (value) {
      addTodo(value);
    }
  };
  const doAddAndClear = () => {
    doAdd();
    setValue("");
  };
  return (
    <div className={styles.form}>
      <Grid container spacing={3} data-cy="todo-form">
        <Grid item xs={8} className={styles.addBar}>
          <SendIcon className={styles.icon} />
          <InputBase
            className={styles.input}
            placeholder="Type To Do Text"
            inputProps={{ "aria-label": "search" }}
            data-cy="todo-input"
            onChange={handleChange}
            value={value}
          />
        </Grid>
        <Grid item xs={4}>
          <Box component="span" m={1}>
            <Button variant="contained" color="primary" data-cy="todo-add" onClick={doAdd}>
              <AddBoxIcon />
            </Button>
          </Box>
          <Box component="span" m={1}>
            <Button variant="contained" color="secondary" data-cy="todo-addAndClear" onClick={doAddAndClear}>
              <QueueIcon />
            </Button>
          </Box>
        </Grid>
      </Grid>
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
    <div className={styles.item} data-cy="todo">
      <Alert
        severity="info"
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={doRemove} data-cy="todo-remove">
            <DeleteForeverIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{todo.text}</AlertTitle>
      </Alert>
    </div>
  );
};

const TodoList = ({ todos, remove }) => {
  // Map through the todos
  const todoNode = todos.map(todo => {
    return <Todo todo={todo} key={todo.key} remove={remove} />;
  });
  return <Box m={1}>{todoNode}</Box>;
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
    <div className="todo-list" data-cy="todo-list">
      <h1>To Do Application</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={toDos} remove={handleRemove} />
    </div>
  );
};
