// Get references to elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

const toggleThemeBtn = document.getElementById('toggleTheme');

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggleThemeBtn.textContent = '☀️ Light Mode';
}

// Toggle theme
toggleThemeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        toggleThemeBtn.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        toggleThemeBtn.textContent = '🌙 Dark Mode';
    }
});

// Load tasks from localStorage when page loads
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
});

taskInput.addEventListener('keypress', function(event) {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// Add event listener to button
addBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim(); // get input value

    if(taskText === "") {
        alert("Please enter a task!");
        return;
    }

    addTaskToDOM(taskText, false);

    // Save to localStorage
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear input
    taskInput.value = "";
});

// Function to add task to the DOM
function addTaskToDOM(taskText, isCompleted) {
    const li = document.createElement('li');
    li.textContent = taskText;

    if(isCompleted) {
        li.classList.add('completed');
    }

    // Mark as completed on click
    li.addEventListener('click', function() {
        li.classList.toggle('completed');

        // Update localStorage
        tasks = tasks.map(task =>
            task.text === taskText ? { text: task.text, completed: li.classList.contains('completed') } : task
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    // Delete task
    deleteBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // prevent toggling completed
        taskList.removeChild(li);

        // Remove from localStorage
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}
