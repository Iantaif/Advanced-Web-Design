document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-button");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    let todos = [];

    // Function to fetch todos from the API
    async function fetchTodos() {
        const response = await fetch('https://1112bed1-7b82-4ca4-b68f-80bf06a38787.mock.pstmn.io/api/todo');
        const data = await response.json();
        todos = data;
        displayTodos();
    }

    // Function to add a new todo
    async function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === "") {
            return;
        }

        const response = await fetch('https://1112bed1-7b82-4ca4-b68f-80bf06a38787.mock.pstmn.io/api/todo', {
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
    }

    // Function to delete a todo
    async function deleteTodo(index) {
        const todoId = todos[index].id;
        await fetch(`https://1112bed1-7b82-4ca4-b68f-80bf06a38787.mock.pstmn.io/api/todo/${todoId}`, {
            method: 'DELETE'
        });
        todos.splice(index, 1);
        displayTodos();
    }

    // Function to update a todo
    async function updateTodoText(index, newText) {
        const todoId = todos[index].id;
        await fetch(`https://1112bed1-7b82-4ca4-b68f-80bf06a38787.mock.pstmn.io/api/todo/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskName: newText
            })
        });
        todos[index].text = newText;
        todos[index].isEditing = false;
        displayTodos();
    }

    addButton.addEventListener("click", addTodo);

    function displayTodos() {
        todoList.innerHTML = "";

        todos.forEach((todo, index) => {
            const listItem = document.createElement("li");

            if (todo.isEditing) {
                const input = document.createElement("input");
                input.type = "text";
                input.value = todo.text;
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

    fetchTodos();
});
