// Import required modules
const path = require('path');  // Module to handle file paths
const fs = require('fs');      // Module to handle file system operations
const { v4: uuidv4 } = require('uuid');  // Module to generate unique IDs

const express = require('express');
const app = express();  // Initialize an Express application
const PORT = process.env.PORT || 3001;  // Define the port for the server

app.use(express.json());  // Middleware to parse incoming JSON data
app.use(express.urlencoded({ extended: true }));  // Middleware to parse URL-encoded data
app.use(express.static('public'));  // Middleware to serve static assets

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});

// Route to serve 'notes.html' file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Route to retrieve all notes as JSON
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

// Default route to serve 'index.html' for unspecified endpoints
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Route to handle adding a new note
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        const notes = JSON.parse(data);
        const newNote = { ...req.body, id: uuidv4() };  // Create new note with a unique ID

        notes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), err => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

// Route to handle deleting a specific note by ID
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        // Filter out the note to be deleted
        const updatedNotes = notes.filter(note => note.id !== noteId);

        // Write the updated notes back to the file
        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 2), err => {
            if (err) throw err;
            res.json({ message: 'Note deleted successfully!' });
        });
    });
});