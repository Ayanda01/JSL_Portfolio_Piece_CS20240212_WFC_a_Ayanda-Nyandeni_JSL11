//Importing the JSON data and all of the helper functions.

import {getTasks,createNewTask,patchTask,putTask,deleteTask} from "./utils/taskFunctions.js";
import { initialData } from "./initialData.js";


// Function checks if local storage already has data, if not it loads initialData to localStorage
//Function 1
//I found no bugs on this function
function initializeData() {
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify(initialData));
    localStorage.setItem("showSideBar", "true");
  } else {
    console.log("Data already exists in localStorage");
  }
}

const elements = {
  // Navigation Sidebar elements
  sideBar: document.querySelector(".side-bar"),
  logo: document.getElementById("logo"),
  boardsNavLinks: document.getElementById("boards-nav-links-div"),
  darkThemeIcon: document.getElementById("icon-dark"),
  themeSwitch: document.getElementById("switch"),
  lightThemeIcon: document.getElementById("icon-light"),
  hideSideBarBtn: document.getElementById("hide-side-bar-btn"),
  showSideBarBtn: document.getElementById("show-side-bar-btn"),

  // Header
  headerBoardName: document.getElementById("header-board-name"),
  addNewTaskBtn: document.getElementById("add-new-task-btn"),
  editBoardBtn: document.getElementById("edit-board-btn"),

  // Task Columns
  columnDivs: document.querySelectorAll(".column-div"),
  todoColumn: document.querySelector('.column-div[data-status="todo"]'),
  doingColumn: document.querySelector('.column-div[data-status="doing"]'),
  doneColumn: document.querySelector('.column-div[data-status="done"]'),
  filterDiv: document.getElementById("filterDiv"),

  // New Task Modal
  titleInput: document.getElementById("title-input"),
  descInput: document.getElementById("desc-input"),
  selectStatus: document.getElementById("select-status"),
  createNewTaskBtn: document.getElementById("add-new-task-btn"),
  cancelAddTaskBtn: document.getElementById("cancel-add-task-btn"),
  newTaskModal: document.getElementById("new-task-modal-window"),
  modalWindow: document.getElementById("new-task-modal-window"),

  // Edit Task Modal
  editTaskModal: document.querySelector(".edit-task-modal-window"),
  editTaskTitleInput: document.getElementById("edit-task-title-input"),
  editTaskDescInput: document.getElementById("edit-task-desc-input"),
  editSelectStatus: document.getElementById("edit-select-status"),
  saveTaskChangesBtn: document.getElementById("save-task-changes-btn"),
  cancelEditBtn: document.getElementById("cancel-edit-btn"),
  deleteTaskBtn: document.getElementById("delete-task-btn"),

  // Filter
  filterDiv: document.getElementById("filterDiv"),
};
let activeBoard = "";

// Extracts unique board names from tasks
//Function 2
//I found one bug here related to the ternary operator
function fetchAndDisplayBoardsAndTasks() {
  const tasks = getTasks();
  const boards = [...new Set(tasks.map((task) => task.board).filter(Boolean))];
  displayBoards(boards);
  if (boards.length > 0) {
    const localStorageBoard = JSON.parse(localStorage.getItem("activeBoard"));
    activeBoard = localStorageBoard ? localStorageBoard : boards[0];
    elements.headerBoardName.textContent = activeBoard;
    styleActiveBoard(activeBoard);
    refreshTasksUI();
  }
}

// Creates different boards in the DOM
//The error here was related to the fact that the click event listener is not correctly implemented since the addEventlistener DOM method is not used 
//Function 3
function displayBoards(boards) {
  const boardsContainer = document.getElementById("boards-nav-links-div");
  boardsContainer.innerHTML = ""; 
  boards.forEach((board) => {
    const boardElement = document.createElement("button");
    boardElement.textContent = board;
    boardElement.classList.add("board-btn");
    //Using addEventListener method to add eventlistener. 
    boardElement.addEventListener("click", () => {
      elements.headerBoardName.textContent = board;
      filterAndDisplayTasksByBoard(board);
      activeBoard = board; 
      localStorage.setItem("activeBoard", JSON.stringify(activeBoard));
      styleActiveBoard(activeBoard);
    });
    boardsContainer.appendChild(boardElement);
  });
}

// Filters tasks corresponding to the board name and displays them on the DOM.
// We have to use strict equality operator '===' instead of assignment ‘=‘ in order for the ternary operator to work correctly..
//Another function fact that the event listener is not correctly implemented since click() is used instead of ‘click’ it is incorrect because click is not a method
//Function 3
function filterAndDisplayTasksByBoard(boardName) {
  const tasks = getTasks(); /
  const filteredTasks = tasks.filter((task) => task.board === boardName); 
    column.innerHTML = `<div class="column-head-div">
                          <span class="dot" id="${status}-dot"></span>
                          <h4 class="columnHeader">${status.toUpperCase()}</h4>
                        </div>`;
    const tasksContainer = document.createElement("div");
    column.appendChild(tasksContainer);
    filteredTasks
      .filter((task) => task.status === status)
      .forEach((task) => {       
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-div");
        taskElement.textContent = task.title;
        taskElement.setAttribute("data-task-id", task.id);
        //This is the click eventlistener which opens the edit modal when the users click to edit tasks
        taskElement.addEventListener("click", () => {
          openEditTaskModal(task);
        });
        tasksContainer.appendChild(taskElement);
      });
  });
}

function refreshTasksUI() {
  filterAndDisplayTasksByBoard(activeBoard);
}

// Styles the active board by adding an active class
//tyleActiveBoard function the first bug lies in the fact that CamelCase is not used for the forEach array method instead they wrote this method as foreach which is incorrect and causes a bug
//Function 4
//The second bug is DOM-related since we want to add and remove classes theissue here is the fact that the .classList property is not used along with add or remove giving us btn.classList.add(‘active’) as the correct implementation
function styleActiveBoard(boardName) {
  document.querySelectorAll(".board-btn").forEach((btn) => {
    if (btn.textContent === boardName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}
//Function 5
function addTaskToUI(task) {
  const column = document.querySelector(
    '.column-div[data-status="${task.status}"]'
  );
  if (!column) {
    console.error(`Column not found for status: ${task.status}`);
    return;
  }

  let tasksContainer = column.querySelector(".tasks-container");
  if (!tasksContainer) {
    console.warn(
      `Tasks container not found for status: ${task.status}, creating one.`
    );
    tasksContainer = document.createElement("div");
    tasksContainer.className = "tasks-container";
    column.appendChild(tasksContainer);
  }

  const taskElement = document.createElement("div");
  taskElement.className = "task-div";
  taskElement.textContent = task.title; // Modify as needed
  taskElement.setAttribute("data-task-id", task.id);

  tasksContainer.appendChild();
}

//Function 6
function setupEventListeners() {
  const cancelEditBtn = document.getElementById("cancel-edit-btn");
  cancelEditBtn.addEventListener("click", () =>
    toggleModal(false, elements.editTaskModal)
  );

  const cancelAddTaskBtn = document.getElementById("cancel-add-task-btn");
  cancelAddTaskBtn.addEventListener("click", () => {
    toggleModal(false);
    elements.filterDiv.style.display = "none"; 
  });
 
  elements.filterDiv.addEventListener("click", () => {
    toggleModal(false);
    elements.filterDiv.style.display = "none"; 
  });

  elements.hideSideBarBtn.addEventListener("click", () => toggleSidebar(false));
  elements.showSideBarBtn.addEventListener("click", () => toggleSidebar(true));
  elements.themeSwitch.addEventListener("change", toggleTheme);
  elements.createNewTaskBtn.addEventListener("click", () => {
    toggleModal(true);
    elements.filterDiv.style.display = "block"; 
  });

  // Add new task form submission event listener
  elements.modalWindow.addEventListener("submit", (event) => {
    addTask(event);
  });
}

// Toggles tasks modal
//The bug i fixed here prevented the ternary operator from implementing it's logic since I had to change => to : .After this change is made the ternary operator to set the display style either block or none of the modal correctly
//Function 7 write if statements normally 
function toggleModal(show, modal = elements.modalWindow) {
  modal.style.display = show ? "block" : "none"; // Fixed ternary operator syntax
}

// I had to complete code for five incomplete functions these functions are addTask, toggleSidebar,toggleTheme,openEditTaskModal and lastly the saveTaskChanges function.
//Function 8
function addTask(event) {
  event.preventDefault();

 //For the first function the addTask I had to add the task object.
  const task = {
    title: document.getElementById("title-input").value,
    description: document.getElementById("desc-input").value,
    status: document.getElementById("select-status").value,
    board: activeBoard,
  };

  //Then I used helper functions such as toggleModaland createNew Task to successfully add new tasks to UI and hiding the modal when new task is added

  const newTask = createNewTask(task);
  if (newTask) {
    addTaskToUI(newTask);
    toggleModal(false);
    newTask.board = activeBoard;
    initialData.push(newTask);
    elements.filterDiv.style.display = "none"; 
    event.target.reset();
    initialData.push(newTask);
    initialData.pop();
    localStorage.setItem("tasks", JSON.stringify(initialData));
    refreshTasksUI();
  }
}

//Function 9
//The second function is the toggleSidebar function.and I completed the function by using an if statement to toggle the display property of the sidebar either to a flex display or none and this is also done for the showSideBarBtn which toggles the sidebar using a click event listener
function toggleSidebar(show) {
  if (show) {
    elements.sideBar.style.display = "flex"; // Use a flex display
    elements.showSideBarBtn.style.display = "none";
  } else {
    elements.sideBar.style.display = "none"; 
    elements.showSideBarBtn.style.display = "block";
  }
}
toggleSidebar(true);

//Function 10
function toggleTheme() {
  const body = document.body;

  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");


  const isLightTheme = body.classList.contains("light-theme");
  localStorage.setItem("theme", isLightTheme ? "light" : "dark");
}

//Function 11
//The fourth function is the editTaskModal function and I completed it by updating the inputs of the modal by assigning them to the properties of our task which is a parameter for this function
function openEditTaskModal(task) {
  // Updates the task details in modal inputs
  const titleInput = document.getElementById("edit-task-title-input");
  const descInput = document.getElementById("edit-task-desc-input");
  const statusSelect = document.getElementById("edit-select-status");

//Reassignment
  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

 // To finish the function off I added two event listeners for the saveTaskchanges and the deleteTaskbutton and I used helper function saveTaskChanges and deleteTask functions and we also use the toggleModal function to toggle the ediTtask modal.
  const saveTaskChangesBtn = document.getElementById("save-task-changes-btn");
  const deleteTaskBtn = document.getElementById("delete-task-btn");
//Saving tasks
  saveTaskChangesBtn.addEventListener("click", () => {
    saveTaskChanges(task.id);
    //refresh the UI
    refreshTasksUI();
    toggleModal(false, elements.editTaskModal);
  });

//Deleting tasks
  deleteTaskBtn.addEventListener("click", () => {
    deleteTask(task.id);
    refreshTasksUI();
    toggleModal(false, elements.editTaskModal);
  });

  toggleModal(true, elements.editTaskModal); // Show the edit task modal
}


//Function 12
//The last function is the saveTaskChanges function and I completed the function by using the DOM to reference the inputs for title and description as well as the status.
function saveTaskChanges(taskId) {
  const titleInput = document.getElementById("edit-task-title-input");
  const descInput = document.getElementById("edit-task-desc-input");
  const statusSelect = document.getElementById("edit-select-status");

//The next step I took was storing these in an object and usingthe .value property to access the values. Lastly, I used thepatchTask function which I exported to update the task onthe UI. I closed off by using the toggleModal function to remove the editTask modal and I also refreshed the U
  const updatedTask = {
    id: taskId,
    title: titleInput.value,
    description: descInput.value,
    status: statusSelect.value,
  };

 //Call exported function to update elements on UI.
  patchTask(taskId, updatedTask);
  toggleModal(false, elements.editTaskModal);
  refreshTasksUI();
}



document.addEventListener("DOMContentLoaded", function () {
  init(); 
});

function init() {
  setupEventListeners();
  const showSidebar = localStorage.getItem("showSideBar") === "true";
  toggleSidebar(showSidebar);
  const isLightTheme = localStorage.getItem("light-theme") === "enabled";
  document.body.classList.toggle("light-theme", isLightTheme);
  fetchAndDisplayBoardsAndTasks(); 
}
