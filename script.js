document.getElementById('addTask').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput').value;
    if (taskInput) {
        const taskTable = document.querySelector('table tbody');
        const newRow = taskTable.insertRow();

        const idCell = newRow.insertCell(0);
        const taskCell = newRow.insertCell(1);
        const editCell = newRow.insertCell(2);
        const deleteCell = newRow.insertCell(3);
        const completeCell = newRow.insertCell(4);

        idCell.textContent = taskTable.rows.length;

        // Create a span for the task content
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskInput;
        taskCell.appendChild(taskSpan);

        // Create an edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'editButton btn btn-success';
        editCell.appendChild(editButton);

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton btn btn-danger';
        deleteCell.appendChild(deleteButton);

        // Create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        completeCell.appendChild(checkbox);

        document.getElementById('taskInput').value = '';
    }
});

// Event listener for deleting tasks
document.querySelector('table').addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteButton')) {
        const row = event.target.closest('tr');
        row.remove();
    }
});

// Event listener for editing tasks
document.querySelector('table').addEventListener('click', (event) => {
    if (event.target.classList.contains('editButton')) {
        const row = event.target.closest('tr');
        const taskCell = row.cells[1];
        const taskSpan = taskCell.querySelector('span');
        const taskText = taskSpan.textContent;

        // Replace the task text with an input field for editing
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskText;
        taskCell.textContent = '';
        taskCell.appendChild(editInput);

        // Create a Save button for editing
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.className = 'saveButton btn btn-primary';
        editCell = row.cells[2];
        editCell.textContent = '';
        editCell.appendChild(saveButton);

        // Create a checkbox for the row
        const checkbox = row.querySelector('input[type="checkbox"]');
        completeCell = row.cells[4];
        completeCell.textContent = '';
        completeCell.appendChild(checkbox);
    }
});

// Event listener for saving edited tasks
document.querySelector('table').addEventListener('click', (event) => {
    if (event.target.classList.contains('saveButton')) {
        const row = event.target.closest('tr');
        const taskCell = row.cells[1];
        const editInput = taskCell.querySelector('input');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = editInput.value;
        taskCell.textContent = '';
        taskCell.appendChild(taskSpan);

        // Restore the checkbox
        const checkbox = row.querySelector('input[type="checkbox"]');
        completeCell = row.cells[4];
        completeCell.textContent = '';
        completeCell.appendChild(checkbox);

        // Change the Save button back to Edit
        editCell = row.cells[2];
        editCell.textContent = '';
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'editButton btn btn-success';
        editCell.appendChild(editButton);
    }
});

// Event listener for fading completed tasks
document.querySelector('table').addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        const row = event.target.closest('tr');
        if (event.target.checked) {
            row.style.opacity = 0.5;
        } else {
            row.style.opacity = 1;
        }
    }
});
