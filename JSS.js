document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-button");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    let todos = [];

    // Function to fetch todos from the API
    async function fetchTodos() {
        try {
            const response = await fetch('https://743e6beb-8fed-41b0-bf1a-6d487a80e69f.mock.pstmn.io/api/todo');
            const data = await response.json();
            todos = data;
            displayTodos();
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    // Function to add a new todo
    async function addTodo() {
        try {
            const todoText = todoInput.value.trim();
            if (todoText === "") {
                return;
            }

            const response = await fetch('https://743e6beb-8fed-41b0-bf1a-6d487a80e69f.mock.pstmn.io/api/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskName: todoText
                })
            });

            const newTodo = await response.json();
            todos.push(newTodo);
            todoInput.value = "";
            displayTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    // Function to delete a todo
    async function deleteTodo(index) {
        try {
            const todoId = todos[index].id;
            await fetch(`https://743e6beb-8fed-41b0-bf1a-6d487a80e69f.mock.pstmn.io/api/todo/${todoId}`, {
                method: 'DELETE'
            });
            todos.splice(index, 1);
            displayTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    // Function to update a todo
    async function updateTodoText(index, newText) {
        try {
            const todoId = todos[index].id;
            await fetch(`https://743e6beb-8fed-41b0-bf1a-6d487a80e69f.mock.pstmn.io/api/todo/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskName: newText
                })
            });
            todos[index].taskName = newText;
            todos[index].isEditing = false;
            displayTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    // Function to display todos
    function displayTodos() {
        todoList.innerHTML = "";

        todos.forEach((todo, index) => {
            const listItem = document.createElement("li");

            if (todo.isEditing) {
                const input = document.createElement("input");
                input.type = "text";
                input.value = todo.taskName;
                input.addEventListener("keyup", (event) => {
                    if (event.key === "Enter") {
                        updateTodoText(index, input.value);
                    }
                });

                listItem.appendChild(input);
            } else {
                listItem.textContent = todo.taskName;

                const buttonsContainer = document.createElement("div");
                buttonsContainer.classList.add("button-container");

                const editButton = document.createElement("button");
                editButton.classList.add("edit-button");
                editButton.textContent = "Edit";

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");
                deleteButton.textContent = "Delete";

                editButton.addEventListener("click", () => {
                    todos[index].isEditing = true;
                    displayTodos();
                });

                deleteButton.addEventListener("click", () => {
                    deleteTodo(index);
                });

                buttonsContainer.appendChild(editButton);
                buttonsContainer.appendChild(deleteButton);

                listItem.appendChild(buttonsContainer);
            }

            todoList.appendChild(listItem);
        });
    }

    // Fetch initial todos
    fetchTodos();

    // Add event listener to the add button
    addButton.addEventListener("click", addTodo);
});
