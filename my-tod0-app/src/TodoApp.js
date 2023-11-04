import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./css/style.css";


const TodoApp = () => {
  const [todos, setTodos] = useState([]); // luu danh sach
  const [todoInput, setTodoInput] = useState("");//luu tra tri khi ng dung thêm vào 

  useEffect(() => {
    fetchTodos();
  }, []); // gọi fetch để render

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

  const addTodo = async () => {
    try {
      if (todoInput === "") {
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
            taskName: todoInput,
          }),
        }
      );

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setTodoInput("");
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
  return (
    <div>
      <h1 className="header1">Task List</h1>
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="Your planned ?"
        id="todo-input"
      />
      <button onClick={addTodo} id="add-button">
        Add
      </button>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};
export default TodoApp;
