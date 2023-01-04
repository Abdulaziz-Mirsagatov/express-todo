const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/', async (req, res) => {
    req.session.destroy(err => res.redirect('/login'));
});

module.exports = router;