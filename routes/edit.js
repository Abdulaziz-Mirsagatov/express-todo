const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../models/task');
const { User } = require('../models/user'); 
const auth = require('../middleware/auth');

router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);

    res.render('pages/edit', {task, message: req.flash('message')});
});

router.post('/:id', auth, async (req, res) => {
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
    };
});

router.get('/remove/:id', auth, async (req, res) => {
    const _id = req.params.id;
    await Task.findOneAndDelete({_id});

    const { userId } = req.session;
    const user = await User.findById(userId);
    const taskId = user.tasks.indexOf(_id);
    user.tasks.splice(taskId, 1);
    await user.save();

    res.redirect('/');
});

module.exports = router;