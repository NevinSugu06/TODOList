// ... (Previous code for setup and connection to MongoDB)

// Create a new task
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    collection.insertOne(newTask, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating task.');
        } else {
            res.json(result.ops[0]);
        }
    });
});

// Get all tasks
app.get('/tasks', (req, res) => {
    collection.find({}).toArray((err, tasks) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching tasks.');
        } else {
            res.json(tasks);
        }
    });
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    collection.findOne({ _id: new mongodb.ObjectId(taskId) }, (err, task) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching task.');
        } else {
            res.json(task);
        }
    });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    collection.updateOne(
        { _id: new mongodb.ObjectId(taskId) },
        { $set: updatedTask },
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error updating task.');
            } else {
                res.json({ message: 'Task updated successfully' });
            }
        }
    );
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    collection.deleteOne({ _id: new mongodb.ObjectId(taskId) }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting task.');
        } else {
            res.json({ message: 'Task deleted successfully' });
        }
    });
});

// ... (Rest of the code)

