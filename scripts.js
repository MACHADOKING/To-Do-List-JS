const inputTask = document.getElementById("input-add-task");
const addTaskButton = document.getElementById("add-task-button");
const allTodoList = document.querySelector(".container");
const todoContainer = document.querySelector(".tasks-form");
const editTasks = document.querySelector(".edit-tasks");
const inputForms = document.querySelector(".inputs-submits");
const cancelEditBtn = document.querySelector(".cancel-edit-button");
const editInput = document.getElementById("input-edit-task");
const editFormButton = document.getElementById("edit-form-button");

let oldInputValue;

const inputValidate = () => inputTask.value.trim().length > 0;

const addTaskClick = () => {
  const inputValidated = inputValidate();

  if (!inputValidated) {
    return inputTask.classList.add("error");
  }

  if (inputValidated) {
    inputTask.classList.remove("error");
  }

  const todoList = document.createElement("div");
  todoList.classList.add("task-single");

  const todoTitle = document.createElement("p");
  todoTitle.innerText = inputTask.value;
  todoList.appendChild(todoTitle);

  //   const buttonsDiv = document.createElement("div");
  //   buttonsDiv.classList.add("buttons-task");
  //   todoList.appendChild(buttonsDiv);

  const checkTask = document.createElement("button");
  checkTask.classList.add("check-button");
  checkTask.innerHTML = '<i class="fa-solid fa-check-double"></i>';
  todoList.appendChild(checkTask);

  const editTask = document.createElement("button");
  editTask.classList.add("edit-button");
  editTask.innerHTML = '<i class="fa-solid fa-pencil"></i>';
  todoList.appendChild(editTask);

  const deleteTask = document.createElement("button");
  deleteTask.classList.add("delete-button");
  deleteTask.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  todoList.appendChild(deleteTask);

  //   deleteTask.addEventListener("click", () =>
  //     handleDeleteTask(todoList, todoTitle)
  //   );

  todoContainer.appendChild(todoList);

  inputTask.value = "";
  inputTask.focus();
};

// function handleDeleteTask(todoList, todoTitle) {
//   const tasks = todoContainer.childNodes;

//   for (const task of tasks) {
//     const currentTaskHasBeenClicked = task.firstChild.isSameNode(todoTitle);

//     if (currentTaskHasBeenClicked) {
//       todoList.remove();
//     }
//   }
// }

const toggleForms = () => {
  editTasks.classList.toggle("hide");
  inputForms.classList.toggle("hide");
  todoContainer.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".task-single");
  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("p");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

addTaskButton.addEventListener("click", () => addTaskClick());

document.addEventListener("click", (e) => {
  e.preventDefault;

  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  const fatherEl = parentEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("p")) {
    todoTitle = parentEl.querySelector("p").innerText;
  }

  if (targetEl.classList.contains("check-button")) {
    fatherEl.classList.toggle("completed");
    // todoTitle.classList.toggle('completed')
  }

  if (targetEl.classList.contains("delete-button")) {
    parentEl.remove();
  }

  if (targetEl.classList.contains("edit-button")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  toggleForms();
});

editFormButton.addEventListener("click", (e) => {
  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }
  toggleForms();
});
