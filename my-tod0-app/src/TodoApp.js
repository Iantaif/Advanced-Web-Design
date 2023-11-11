import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./css/style.css"; // Import corresponding CSS file

const useTodoApp = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://743e6beb-8fed-41b0-bf1a-6d487a80e69f.mock.pstmn.io/api/todo"
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (todoText) => {
    try {
      if (todoText === "") {
        return;
      }

      const response = await fetch(
        "https://743e6beb-8fed-41b0-bf1a-6d487a80e69f.mock.pstmn.io/api/todo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskName: todoText,
          }),
        }
      );

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (index) => {
    try {
      const todoId = todos[index].id;
      await fetch(
        `https://743e6beb-8fed-41b0-bf1a-6d487a80e69f.mock.pstmn.io/api/todo/${todoId}`,
        {
          method: "DELETE",
        }
      );
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodoText = async (index, newText) => {
    try {
      const todoId = todos[index].id;
      await fetch(
        `https://743e6beb-8fed-41b0-bf1a-6d487a80e69f.mock.pstmn.io/api/todo/${todoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskName: newText,
          }),
        }
      );
      const updatedTodos = [...todos];
      updatedTodos[index].taskName = newText;
      updatedTodos[index].isEditing = false;
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, addTodo, deleteTodo, updateTodoText };
};

const TodoApp = () => {
  const { todos, addTodo, deleteTodo, updateTodoText } = useTodoApp();

  const handleAddTodo = () => {
    const todoInput = document.getElementById("todo-input");
    const newTodoText = todoInput.value.trim();
    if (newTodoText !== "") {
      addTodo(newTodoText); // Chuyển nội dung nhiệm vụ mới vào hàm addTodo
      todoInput.value = ""; // Xóa nội dung ô nhập sau khi thêm nhiệm vụ thành công
    } else {
      // Hiển thị thông báo yêu cầu người dùng nhập nội dung trước khi thêm nhiệm vụ
      alert("Please enter a task before adding.");
    }
  };

  const handleDeleteTodo = (index) => {
    deleteTodo(index);
  };

  const handleUpdateTodoText = (index, newText) => {
    const newTodoText = prompt("Enter the new text", newText); // Sử dụng prompt để nhập nội dung mới
    if (newTodoText !== null) {
      updateTodoText(index, newTodoText);
    }
  };

  return (
    <div className="todo-app">
      <nav className="nav">TO DO</nav>
      <div className="todo-container">
        <div className="header1">
          <h1>Task List</h1>
        </div>
        <div className="add-todo">
          <input type="text" id="todo-input" placeholder="Your planned ?" />
          <button id="add-button" onClick={handleAddTodo}>
            <FontAwesomeIcon icon={faPlus} className="custom-plus" />
          </button>
        </div>
        <div className="header2">
          <h2>Task</h2>
        </div>
        <div className="my-list">
          <ul id="todo-list" className="My-todo-list">
            {todos.map((todo, index) => (
              <li key={index}>
                {todo.taskName}
                <div className="button-container">
                  <button
                    className="edit-button"
                    onClick={() => handleUpdateTodoText(index, "New Text")}
                  >
                    <FontAwesomeIcon icon={faEdit} className="button-icon" />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="button-icon" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
