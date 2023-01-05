const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Task} = require('../models/task');
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    const { userId } = req.session;
    const user = await User.findById(userId);
    const tasks = await Task.find({_id: {$in: user.tasks}});
    const username = user.username;
    
    res.render("pages/index", {tasks, message: req.flash('message'), username});
});

module.exports = router;