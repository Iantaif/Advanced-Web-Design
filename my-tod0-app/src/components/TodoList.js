import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, deleteTodo }) => {
  return (
    <ul className="my-list">
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} deleteTodo={deleteTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
