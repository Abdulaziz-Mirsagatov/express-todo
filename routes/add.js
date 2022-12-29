const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/task');
const flash = require('connect-flash');
const router = express.Router();

router.get('/', (req, res) => { 
    res.render('pages/add', {message: req.flash('message')});
});

router.post('/', async (req, res) => {
    let task = await Task.findOne({name: req.body.name});
    if (task) {
        req.flash('message', 'Task already exists');

        res.redirect('/add');
    }
    else{
        try {
            task = new Task({ name: req.body.name });
            await task.save();

            req.flash('message', 'Task added!');

            res.redirect('/');
        }
        catch(ex){
            req.flash('message', 'Invalid task name');

            res.redirect('/add');
        }
    }
})

module.exports = router;