const express = require('express');
const mongoose = require('mongoose');
const {User} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if (req.session.userId) return res.redirect('/');

    res.render('pages/login', {message: req.flash('message')});
});

router.post('/', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log();
    if (!user) {
        req.flash('message', 'Incorrect email or password');
        res.redirect('/login');
        return;
    };

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
            req.flash('message', 'Incorrect email or password');
            return res.redirect('/login');
        }
        else{
            req.session.token = user.genAuthToken();
            return res.redirect('/');
        }
    })
});

module.exports = router;