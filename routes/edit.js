const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../models/task');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);

    res.render('pages/edit', {task, message: req.flash('message')});
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    let task = await Task.findById(id);

    try {
        task.name = req.body.name;
        task.completed = (req.body.completed === "on" ? true : false);
        await task.save();

        req.flash('message', 'Task edited!');

        res.redirect('/');
    }
    catch(ex){
        req.flash('message', 'Invalid task name');

        res.redirect('/edit/' + id);
    }

    // await Task.findByIdAndUpdate(id, {
    //     'name': req.body.name,
    //     'completed': 
    // });

    
});

router.get('/remove/:id', async (req, res) => {
    const _id = req.params.id;
    await Task.findOneAndDelete({_id});

    res.redirect('/');
});

module.exports = router;