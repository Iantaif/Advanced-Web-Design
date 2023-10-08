document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-button");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    let todos = [];

    addButton.addEventListener("click", function () {
        const todoText = todoInput.value.trim();
        if (todoText === "") {
            return;
        }

        const todo = {
            text: todoText,
            isEditing: false,
        };

        todos.push(todo);
        todoInput.value = "";
        displayTodos();
    });

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
                        todos[index].text = input.value;
                        todos[index].isEditing = false;
                        displayTodos();
                    }
                });

                listItem.appendChild(input);
            } else {
                listItem.textContent = todo.text;

                const buttonsContainer = document.createElement("div");
                buttonsContainer.classList.add("button-container");

                const editButton = document.createElement("button");
                editButton.classList.add("edit-button");
                editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");
                deleteButton.innerHTML = '<i class="fa-solid fa-circle-xmark timeslogo"></i>';

                editButton.addEventListener("click", () => {
                    todos[index].isEditing = true;
                    displayTodos();
                });

                deleteButton.addEventListener("click", () => {
                    todos.splice(index, 1);
                    displayTodos();
                });

                buttonsContainer.appendChild(editButton);
                buttonsContainer.appendChild(deleteButton);

                listItem.appendChild(buttonsContainer);
            }

            todoList.appendChild(listItem);
        });
    }

    displayTodos();
});
  