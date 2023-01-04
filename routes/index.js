const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/task');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    const tasks = await Task.find();
    
    res.render("pages/index", {tasks, message: req.flash('message')});
});

module.exports = router;