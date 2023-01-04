const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

module.exports = async (req, res, next) => {
    const token = req.session.token;
    if (!token) return res.redirect('login');

    const decoded = jwt.verify(token, 'mySecretKey');
    if (!decoded) return res.redirect('/login');

    const { _id } = decoded;
    const user = await User.findById(_id);
    if (!user) return res.redirect('/login');

    next();
};