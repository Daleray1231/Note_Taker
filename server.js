const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        const notes = JSON.parse(data);
        const newNote = { ...req.body, id: uuidv4() };

        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), err => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        const updatedNotes = notes.filter(note => note.id !== noteId);

        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 2), err => {
            if (err) throw err;
            res.json({ message: 'Note deleted successfully!' });
        });
    });
});




