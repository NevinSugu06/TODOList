const express = require('express');
const mongodb = require('mongodb');
const app = express();
const port = 3000;

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'todoList'; // Database name

app.use(express.json());

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error(err);
        return;
    }

    const db = client.db(dbName);
    const collection = db.collection('tasks');

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

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
