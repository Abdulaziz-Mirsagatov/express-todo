const express = require('express');
const mongoose = require('mongoose');
const {Task, validate} = require('../models/task');
const {User} = require('../models/user');
const flash = require('connect-flash');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => { 
    res.render('pages/add', {message: req.flash('message')});
});

router.post('/', auth, async (req, res) => {
    const { userId } = req.session;
    const user = await User.findById(userId);
    const tasks = await Task.find({_id: {$in: user.tasks}});

    // checking for existance of task
    if (tasks.some( task => task.name === req.body.name)) {
        req.flash('message', 'Task already exists');

        return res.redirect('/add');
    };

    const {error} = validate(req.body);
    if (error) {
        req.flash('message', error.details[0].message);
        return res.redirect('/add');
    };

    try {
        task = new Task({ name: req.body.name });
        await task.save();
        
        user.tasks.push(task._id);
        await user.save();

        req.flash('message', 'Task added!');

        res.redirect('/');
    }
    catch(ex){
        res.status(500).send("Something went wrong");
    };
})

module.exports = router;