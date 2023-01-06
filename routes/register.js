const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if (req.session.userId) return res.redirect('/');

    res.render('pages/register', {message: req.flash('message')});
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        req.flash('message', error.details[0].message);
        return res.redirect('/register');
    };

    let user = await User.findOne({email: req.body.email});
    if (user) {
        req.flash('message', "User with this email is already registered");
        return res.redirect('/register');
    };

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    try {
        user = new User(req.body);
        await user.save();

        const token = user.genAuthToken();
        req.session.token = token;

        res.redirect('/');
    }
    catch(ex){
        return res.status(500).send("Something went wrong");
    };
})

module.exports = router;