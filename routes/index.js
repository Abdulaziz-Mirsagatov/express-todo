const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/task');

// async function createNewTask() {
//     const task = new Task({
//     name: "Cleaning"
//     });
//     await task.save();
//     return task;
// };

// const task = createNewTask();

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    
    res.render("pages/index", {tasks, message: req.flash('message')});
});

module.exports = router;