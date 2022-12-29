const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../models/task');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);

    res.render('pages/edit', {task});
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    await Task.findByIdAndUpdate(id, {
        'name': req.body.name,
        'completed': (req.body.completed === "on" ? true : false)
    });

    req.flash('message', 'Task edited!');

    res.redirect('/');
});

router.get('/remove/:id', async (req, res) => {
    const _id = req.params.id;
    await Task.findOneAndDelete({_id});

    res.redirect('/');
});

module.exports = router;