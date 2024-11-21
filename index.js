
<<<<<<< HEAD
import {getTasks,createNewTask,patchTask,putTask,deleteTask} from "./utils/taskFunctions.js";
import { initialData } from "./initialData.js";

=======
/*************************************************************************************************************************************************
 * FIX BUGS!!!
 * **********************************************************************************************************************************************/
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
// Function checks if local storage already has data, if not it loads initialData to localStorage
//Function 1
function initializeData() {
<<<<<<< HEAD
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify(initialData));
    localStorage.setItem("showSideBar", "true");
  } else {
    console.log("Data already exists in localStorage");
=======
  if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(initialData));
      localStorage.setItem('showSideBar', 'true');
  } else {
      console.log('Data already exists in localStorage');
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
  }
}

// TASK: Get elements from the DOM
const elements = {
<<<<<<< HEAD
  // elements
  sideBar: document.querySelector(".side-bar"),
  logo: document.getElementById("logo"),
  boardsNavLinks: document.getElementById("boards-nav-links-div"),
  darkThemeIcon: document.getElementById("icon-dark"),
  themeSwitch: document.getElementById("switch"),
  lightThemeIcon: document.getElementById("icon-light"),
  hideSideBarBtn: document.getElementById("hide-side-bar-btn"),
  showSideBarBtn: document.getElementById("show-side-bar-btn"),
  headerBoardName: document.getElementById("header-board-name"),
  addNewTaskBtn: document.getElementById("add-new-task-btn"),
  editBoardBtn: document.getElementById("edit-board-btn"),
  columnDivs: document.querySelectorAll(".column-div"),
  todoColumn: document.querySelector('.column-div[data-status="todo"]'),
  doingColumn: document.querySelector('.column-div[data-status="doing"]'),
  doneColumn: document.querySelector('.column-div[data-status="done"]'),
  filterDiv: document.getElementById("filterDiv"),
  titleInput: document.getElementById("title-input"),
  descInput: document.getElementById("desc-input"),
  selectStatus: document.getElementById("select-status"),
  createNewTaskBtn: document.getElementById("add-new-task-btn"),
  cancelAddTaskBtn: document.getElementById("cancel-add-task-btn"),
  newTaskModal: document.getElementById("new-task-modal-window"),
  modalWindow: document.getElementById("new-task-modal-window"),
  editTaskModal: document.querySelector(".edit-task-modal-window"),
  editTaskTitleInput: document.getElementById("edit-task-title-input"),
  editTaskDescInput: document.getElementById("edit-task-desc-input"),
  editSelectStatus: document.getElementById("edit-select-status"),
  saveTaskChangesBtn: document.getElementById("save-task-changes-btn"),
  cancelEditBtn: document.getElementById("cancel-edit-btn"),
  deleteTaskBtn: document.getElementById("delete-task-btn"),
  filterDiv: document.getElementById("filterDiv"),
=======
  headerBoardName: document.getElementById('header-board-name'),
  columnDivs: document.querySelectorAll('.column-div'),
  hideSideBarBtn: document.getElementById('hide-side-bar-btn'),
  showSideBarBtn: document.getElementById('show-side-bar-btn'),
  themeSwitch: document.getElementById('switch'),
  filterDiv: document.getElementById('filterDiv'),
  modalWindow: document.getElementById('new-task-modal-window'),
  createNewTaskBtn: document.getElementById('add-new-task-btn'),
  editTaskModal: document.querySelector('.edit-task-modal-window')
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
};

let activeBoard = "";

// Extracts unique board names from tasks
//Function 2
//Bug: replace semicolon ; with a colon : this stops ternary operator logic
function fetchAndDisplayBoardsAndTasks() {
  const tasks = getTasks();
  const boards = [...new Set(tasks.map((task) => task.board).filter(Boolean))];
  displayBoards(boards);
  if (boards.length > 0) {
<<<<<<< HEAD
    const localStorageBoard = JSON.parse(localStorage.getItem("activeBoard"));
    activeBoard = localStorageBoard ? localStorageBoard : boards[0];
    elements.headerBoardName.textContent = activeBoard;
    styleActiveBoard(activeBoard);
    refreshTasksUI();
=======
      const localStorageBoard = JSON.parse(localStorage.getItem("activeBoard"));
      activeBoard = localStorageBoard ? localStorageBoard : boards[0];
      elements.headerBoardName.textContent = activeBoard;
      styleActiveBoard(activeBoard);
      refreshTasksUI();
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
  }
}

// Creates different boards in the DOM
//Function 3
//Bug: the click event listener was not correctly implemented
function displayBoards(boards) {
  const boardsContainer = document.getElementById("boards-nav-links-div");
<<<<<<< HEAD
  boardsContainer.innerHTML = ""; // Clears the container
  boards.forEach((board) => {
    const boardElement = document.createElement("button");
    boardElement.textContent = board;
    boardElement.classList.add("board-btn");
    boardElement.addEventListener("click", () => {
      // Use 'addEventListener' to attach click event listener
      elements.headerBoardName.textContent = board;
      filterAndDisplayTasksByBoard(board);
      activeBoard = board; // Corrected assignment syntax
      localStorage.setItem("activeBoard", JSON.stringify(activeBoard));
      styleActiveBoard(activeBoard);
    });
    boardsContainer.appendChild(boardElement);
=======
  boardsContainer.innerHTML = ''; // Clears the container
  boards.forEach(board => {
      const boardElement = document.createElement("button");
      boardElement.textContent = board;
      boardElement.classList.add("board-btn");
      boardElement.addEventListener('click', () => { // Corrected syntax for event listener
          elements.headerBoardName.textContent = board;
          filterAndDisplayTasksByBoard(board);
          activeBoard = board; // assigns active board
          localStorage.setItem("activeBoard", JSON.stringify(activeBoard));
          styleActiveBoard(activeBoard);
      });
      boardsContainer.appendChild(boardElement);
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
  });
}

// Filters tasks corresponding to the board name and displays them on the DOM.
//Function 3
//Bug: we have to replace = with === strict equality operator we had to do this two times
//the last bug was the fact that they used click() instead of click for eventlistener
function filterAndDisplayTasksByBoard(boardName) {
  const tasks = getTasks(); // Fetch tasks from a simulated local storage function
<<<<<<< HEAD
  const filteredTasks = tasks.filter((task) => task.board === boardName); // Used strict equality operator '===' instead of assignment '='


  elements.columnDivs.forEach((column) => {
    const status = column.getAttribute("data-status");
    // Reset column content while preserving the column title
    column.innerHTML = `<div class="column-head-div">
                          <span class="dot" id="${status}-dot"></span>
                          <h4 class="columnHeader">${status.toUpperCase()}</h4>
                        </div>`;
=======
  const filteredTasks = tasks.filter(task => task.board === boardName); // Corrected '=' to '==='

  elements.columnDivs.forEach(column => {
      const status = column.getAttribute("data-status");
      // Reset column content while preserving the column title
      column.innerHTML = `<div class="column-head-div">
                            <span class="dot" id="${status}-dot"></span>
                            <h4 class="columnHeader">${status.toUpperCase()}</h4>
                          </div>`;
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513

      const tasksContainer = document.createElement("div");
      column.appendChild(tasksContainer);

<<<<<<< HEAD
    filteredTasks
      .filter((task) => task.status === status)
      .forEach((task) => {
        // Use strict equality operator '===' instead of assignment '='
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-div");
        taskElement.textContent = task.title;
        taskElement.setAttribute("data-task-id", task.id);

        // Listen for a click event on each task and open a modal
        taskElement.addEventListener("click", () => {
          // Use 'addEventListener' instead of 'click' and remove '=>' arrow function
          openEditTaskModal(task);
        });

        tasksContainer.appendChild(taskElement);
=======
      filteredTasks.filter(task => task.status === status).forEach(task => { // Corrected '=' to '==='
          const taskElement = document.createElement("div");
          taskElement.classList.add("task-div");
          taskElement.textContent = task.title;
          taskElement.setAttribute('data-task-id', task.id);

          // Listen for a click event on each task and open a modal
          taskElement.addEventListener('click', () => { // Corrected syntax for event listener
              openEditTaskModal(task);
          });

          tasksContainer.appendChild(taskElement);
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
      });
  });
}

function refreshTasksUI() {
  filterAndDisplayTasksByBoard(activeBoard);
}

// Styles the active board by adding an active class
//Function 4
// Bug:camelcase was not used for the forEach array method
//they did not use btn.classList.add(‘active’) for adding classes
function styleActiveBoard(boardName) {
<<<<<<< HEAD
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
=======
  document.querySelectorAll('.board-btn').forEach(btn => { // Corrected 'foreach' to 'forEach'
      if (btn.textContent === boardName) {
          btn.classList.add('active'); // Corrected 'add' to 'classList.add'
      } else {
          btn.classList.remove('active'); // Corrected 'remove' to 'classList.remove'
      }
  });
}

function addTaskToUI(task) {
  const column = document.querySelector(`.column-div[data-status="${task.status}"]`); 
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
  if (!column) {
      console.error(`Column not found for status: ${task.status}`);
      return;
  }

  let tasksContainer = column.querySelector(".tasks-container");
  if (!tasksContainer) {
<<<<<<< HEAD
    console.warn(
      `Tasks container not found for status: ${task.status}, creating one.`
    );
    tasksContainer = document.createElement("div");
    tasksContainer.className = "tasks-container";
    column.appendChild(tasksContainer);
=======
      console.warn(`Tasks container not found for status: ${task.status}, creating one.`);
      tasksContainer = document.createElement('div');
      tasksContainer.className = 'tasks-container';
      column.appendChild(tasksContainer);
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
  }

  const taskElement = document.createElement("div");
  taskElement.className = "task-div";
  taskElement.textContent = task.title; // Modify as needed
<<<<<<< HEAD
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

  // Clicking outside the modal to close it
  elements.filterDiv.addEventListener("click", () => {
    toggleModal(false);
    elements.filterDiv.style.display = "none"; 
  });

  // Show sidebar event listener
  elements.hideSideBarBtn.addEventListener("click", () => toggleSidebar(false));
  elements.showSideBarBtn.addEventListener("click", () => toggleSidebar(true));
  elements.themeSwitch.addEventListener("change", toggleTheme);
  elements.createNewTaskBtn.addEventListener("click", () => {
    toggleModal(true);
    elements.filterDiv.style.display = "block"; 
  });

  elements.modalWindow.addEventListener("submit", (event) => {
    addTask(event);
=======
  taskElement.setAttribute('data-task-id', task.id);
  
  tasksContainer.appendChild(taskElement); // Corrected to append the taskElement
}

function setupEventListeners() {
  // Cancel editing task event listener
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  cancelEditBtn.addEventListener('click', () => toggleModal(false, elements.editTaskModal)); // Corrected syntax for event listener

  // Cancel adding new task event listener
  const cancelAddTaskBtn = document.getElementById('cancel-add-task-btn');
  cancelAddTaskBtn.addEventListener('click', () => {
      toggleModal(false);
      elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
  });

  // Clicking outside the modal to close it
  elements.filterDiv.addEventListener('click', () => {
      toggleModal(false);
      elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
  });

  // Show sidebar event listener
  elements.hideSideBarBtn.addEventListener('click', () => toggleSidebar(false)); // Corrected syntax for event listener
  elements.showSideBarBtn.addEventListener('click', () => toggleSidebar(true)); // Corrected syntax for event listener

  // Theme switch event listener
  elements.themeSwitch.addEventListener('change', toggleTheme);

  // Show Add New Task Modal event listener
  elements.createNewTaskBtn.addEventListener('click', () => {
      toggleModal(true);
      elements.filterDiv.style.display = 'block'; // Also show the filter overlay
  });

  // Add new task form submission event listener
  elements.modalWindow.addEventListener('submit', (event) => {
      addTask(event);
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
  });
}

// Toggles tasks modal
//Function 7 write if statements normally 
//Bug:the ternary operator had => instead of : 
function toggleModal(show, modal = elements.modalWindow) {
<<<<<<< HEAD
  modal.style.display = show ? "block" : "none"; // Fixed ternary operator syntax
}

=======
  modal.style.display = show ? 'block' : 'none'; // Corrected syntax
}

/*************************************************************************************************************************************************
* COMPLETE FUNCTION CODE
* **********************************************************************************************************************************************/ 
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513

//Function 8
function addTask(event) {
  event.preventDefault();

  // Assign user input to the task object
  const task = {
<<<<<<< HEAD
    title: document.getElementById("title-input").value,
    description: document.getElementById("desc-input").value,
    status: document.getElementById("select-status").value,
    board: activeBoard,
=======
      title: document.getElementById('title-input').value,
      description: document.getElementById('desc-input').value,
      status: document.getElementById('select-status').value,
      board: activeBoard, // Add this if tasks are board-specific
      id: Date.now() // You may need to adjust ID generation as necessary
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
  };

  const newTask = createNewTask(task);
  if (newTask) {
<<<<<<< HEAD
    addTaskToUI(newTask);
    toggleModal(false);
    newTask.board = activeBoard;
    initialData.push(newTask);
    elements.filterDiv.style.display = "none"; // Also hide the filter overlay
    event.target.reset();

    initialData.push(newTask);
    initialData.pop();
    localStorage.setItem("tasks", JSON.stringify(initialData));
    //putTask(newTask);
    refreshTasksUI();
  }
}
//Function 9
function toggleSidebar(show) {
  if (show) {
    elements.sideBar.style.display = "flex"; // Display the sidebar as flex layout
    elements.showSideBarBtn.style.display = "none";
  } else {
    elements.sideBar.style.display = "none"; 
    elements.showSideBarBtn.style.display = "block";
  }
=======
      addTaskToUI(newTask);
      toggleModal(false);
      elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
      event.target.reset();
      refreshTasksUI();
  }
}

function toggleSidebar(show) {
  const sideBar = document.getElementById('side-bar-div');
  sideBar.style.display = show ? 'block' : 'none'; // Show or hide the sidebar
  localStorage.setItem('showSideBar', show); // Persist sidebar state
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
}
toggleSidebar(true);

//Function 10
function toggleTheme() {
<<<<<<< HEAD
  // Get a reference to the document body
  const body = document.body;

  // Toggle between light and dark theme classes on the body
  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");

  // Check if the current theme is light or dark
  const isLightTheme = body.classList.contains("light-theme");

  // Store the theme preference in local storage using ternary operator
  localStorage.setItem("theme", isLightTheme ? "light" : "dark");
}

//Function 11
function openEditTaskModal(task) {

  const titleInput = document.getElementById("edit-task-title-input");
  const descInput = document.getElementById("edit-task-desc-input");
  const statusSelect = document.getElementById("edit-select-status");

  // Get button elements from the task modal
  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

  // Call saveTaskChanges upon click of Save Changes button
  const saveTaskChangesBtn = document.getElementById("save-task-changes-btn");
  const deleteTaskBtn = document.getElementById("delete-task-btn");

  saveTaskChangesBtn.addEventListener("click", () => {
    saveTaskChanges(task.id);
    refreshTasksUI();
    toggleModal(false, elements.editTaskModal);
  });

  // Delete task using a helper function and close the task modal
  deleteTaskBtn.addEventListener("click", () => {
    deleteTask(task.id);
    // No need to reload the page, just refresh the UI
    refreshTasksUI();
    toggleModal(false, elements.editTaskModal);
  });
=======
  const isLightTheme = document.body.classList.toggle('light-theme');
  localStorage.setItem('light-theme', isLightTheme ? 'enabled' : 'disabled'); // Persist theme state
}

function openEditTaskModal(task) {
  // Set task details in modal inputs
  document.getElementById('edit-task-title-input').value = task.title;
  document.getElementById('edit-task-desc-input').value = task.description;
  document.getElementById('edit-select-status').value = task.status;

  // Call saveTaskChanges upon click of Save Changes button
  const saveChangesBtn = document.getElementById('save-task-changes-btn');
  saveChangesBtn.onclick = () => saveTaskChanges(task.id); // Pass task ID

  // Delete task using a helper function and close the task modal
  const deleteTaskBtn = document.getElementById('delete-task-btn');
  deleteTaskBtn.onclick = () => {
      deleteTask(task.id); // Assuming deleteTask is a function in utils
      toggleModal(false);
      refreshTasksUI();
  };

>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
  toggleModal(true, elements.editTaskModal); // Show the edit task modal
}


//Function 12
function saveTaskChanges(taskId) {
  // Get new user inputs
<<<<<<< HEAD
  const titleInput = document.getElementById("edit-task-title-input");
  const descInput = document.getElementById("edit-task-desc-input");
  const statusSelect = document.getElementById("edit-select-status");

  const updatedTask = {
    id: taskId,
    title: titleInput.value,
    description: descInput.value,
    status: statusSelect.value,
  };

  // Update task using an exported helper functoin
  patchTask(taskId, updatedTask);
=======
  const updatedTask = {
      title: document.getElementById('edit-task-title-input').value,
      description: document.getElementById('edit-task-desc-input').value,
      status: document.getElementById('edit-select-status').value
  };

  // Update task using a helper function
  updateTask(taskId, updatedTask); // Assuming updateTask is a function in utils
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513

  // Close the modal and refresh the UI to reflect the changes
  toggleModal(false, elements.editTaskModal);
  refreshTasksUI();
}

/*************************************************************************************************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  init(); 
});

function init() {
  setupEventListeners();
  const showSidebar = localStorage.getItem("showSideBar") === "true";
  toggleSidebar(showSidebar);
<<<<<<< HEAD
  const isLightTheme = localStorage.getItem("light-theme") === "enabled";
  document.body.classList.toggle("light-theme", isLightTheme);
  fetchAndDisplayBoardsAndTasks(); 
}
=======
  const isLightTheme = localStorage.getItem('light-theme') === 'enabled';
  document.body.classList.toggle('light-theme', isLightTheme);
  fetchAndDisplayBoardsAndTasks(); // Initial display of boards and tasks
}

// Initialize the app
initializeData();
>>>>>>> 7348192979062fc70912e2f608a93f5aa4350513
