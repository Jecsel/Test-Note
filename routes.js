// routes.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let notes = [];

// Create a new note
router.post('/notes', (req, res, next) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return next(new Error('Title and body are required'));
    }

    const newNote = {
        id: uuidv4(),
        title,
        body
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// Retrieve all notes
router.get('/notes', (req, res, next) => {
    res.json(notes);
});

// Retrieve a specific note by ID
router.get('/notes/:id', (req, res, next) => {
    const note = notes.find(note => note.id === req.params.id);
    if (!note) {
        return next(new Error('Note not found'));
    }
    res.json(note);
});

// Update a specific note by ID
router.put('/notes/:id', (req, res, next) => {
    const { title, body } = req.body;
    const noteIndex = notes.findIndex(note => note.id === req.params.id);
    if (noteIndex === -1) {
        return next(new Error('Note not found'));
    }
    if (!title && !body) {
        return next(new Error('Title or body is required for update'));
    }

    notes[noteIndex] = {
        ...notes[noteIndex],
        title: title || notes[noteIndex].title,
        body: body || notes[noteIndex].body
    };
    res.json(notes[noteIndex]);
});

// Delete a specific note by ID
router.delete('/notes/:id', (req, res, next) => {
    const noteIndex = notes.findIndex(note => note.id === req.params.id);
    if (noteIndex === -1) {
        return next(new Error('Note not found'));
    }

    notes.splice(noteIndex, 1);
    res.status(204).send();
});

module.exports = router;
