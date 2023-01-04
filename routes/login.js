const express = require('express');
const mongoose = require('mongoose');
const {User} = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/login', {message: req.flash('message')});
});

router.post('/', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user || user.password !== req.body.password) {
        req.flash('message', 'Incorrect email or password');
        res.redirect('/login');
        return;
    };

    req.session.token = user.genAuthToken();
    res.redirect('/');
});

module.exports = router;