function createTaskElement(task) {
    const tr = document.createElement('tr');

    // Create table cells
    const taskNameTd = document.createElement('td');
    taskNameTd.textContent = task.taskName;

    const startTimeTd = document.createElement('td');
    startTimeTd.textContent = task.startTime;

    const endTimeTd = document.createElement('td');
    endTimeTd.textContent = task.endTime;

    const priorityTd = document.createElement('td');
    priorityTd.textContent = task.priority;
    
    // Adds class to priority cell based on the selected priority
    priorityTd.classList.add(task.priority.toLowerCase().replace('-', ''));

    const statusTd = document.createElement('td');
    statusTd.textContent = task.status;

    const notesTd = document.createElement('td');
    notesTd.textContent = task.notes;

    const actionTd = document.createElement('td');
    const deleteButton = document.createElement('span');
    deleteButton.textContent = '\u00D7';
    deleteButton.classList.add('delete-button');
    deleteButton.setAttribute('onclick', 'deleteTask(this)');
    actionTd.appendChild(deleteButton);


    // Appends cells to the row
    tr.appendChild(taskNameTd);
    tr.appendChild(startTimeTd);
    tr.appendChild(endTimeTd);
    tr.appendChild(priorityTd);
    tr.appendChild(statusTd);
    tr.appendChild(notesTd);
    tr.appendChild(actionTd);

    return tr;
   
}

// Function to add a task to the table
function addTask() {
    const taskName = document.getElementById('task-name').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;
    const notes = document.getElementById('notes').value;

    if (taskName === '') {
        alert('You must write something!');
        return;
    }

    const task = {
        taskName,
        startTime,
        endTime,
        priority,
        status,
        notes
    };

    const tr = createTaskElement(task);
    document.querySelector("#taskTable tbody").appendChild(tr);
    saveData();

    // Clears input fields after adding the task
    document.getElementById('task-name').value = '';
    document.getElementById('start-time').value = '';
    document.getElementById('end-time').value = 'Low';
    document.getElementById('priority').value = '';
    document.getElementById('status').value = '';
    document.getElementById('notes').value = '';
}

// Function to delete a task
function deleteTask(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveData();
}

// Function to save tasks to localStorage
function saveData() {
    const tasks = [];
    document.querySelectorAll('#taskTable tbody tr').forEach(row => {
        const task = {
            taskName: row.cells[0].textContent,
            startTime: row.cells[1].textContent,
            endTime: row.cells[2].textContent,
            priority: row.cells[3].textContent,
            status: row.cells[4].textContent,
            notes: row.cells[5].textContent
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const tr = createTaskElement(task);
        document.querySelector("#taskTable tbody").appendChild(tr);
    });
}

// Load tasks when the page loads
window.onload = loadTasks;