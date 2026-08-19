const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const emptyMessage = document.getElementById("emptyMessage");
const errorMessage = document.getElementById("errorMessage");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

let tasks = [];

// Add a new task
function addTask() {

    const taskText = taskInput.value.trim();

    // Validation
    if (taskText === "") {
        errorMessage.textContent = "Please enter a task.";
        return;
    }

    errorMessage.textContent = "";

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}

// Display tasks
function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        // Task text
        const span = document.createElement("span");

        span.className = "task-text";
        span.textContent = task.text;

        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateSummary();
}

// Mark task as completed
function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    renderTasks();
}

// Delete a task
function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    renderTasks();
}

// Clear all completed tasks
function clearCompletedTasks() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    renderTasks();
}

// Update task summary
function updateSummary() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

// Add task button
addTaskBtn.addEventListener("click", addTask);

// Add task using Enter key
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }
});

// Clear completed button
clearCompletedBtn.addEventListener(
    "click",
    clearCompletedTasks
);

// Clear error message when typing
taskInput.addEventListener("input", function() {
    errorMessage.textContent = "";
});

// Display initial task list
renderTasks();
