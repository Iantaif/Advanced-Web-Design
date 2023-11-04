import React from "react";

const TodoItem = ({ todo, index, deleteTodo }) => {
  const handleDelete = () => {
    deleteTodo(index);
  };

  return (
    <li>
      {todo.taskName}
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
