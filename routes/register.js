const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { User, validate } = require('../models/user');

router.get('/', (req, res) => {
    if (req.session.userId) return res.redirect('/');

    res.render('pages/register');
});

router.post('/', async (req, res) => {
    const isValid = validate({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    if(!isValid) return res.redirect('/register');

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password    
    });
    await user.save();

    const token = user.genAuthToken();
    req.session.token = token;

    res.redirect('/');
})

module.exports = router;