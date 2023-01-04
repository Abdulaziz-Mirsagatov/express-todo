const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

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

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash    
    });
    await user.save();

    const token = user.genAuthToken();
    req.session.token = token;

    res.redirect('/');
})

module.exports = router;