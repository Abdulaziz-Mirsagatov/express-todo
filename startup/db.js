const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', 'false');

module.exports = async () => {
    await mongoose.connect(process.env.DB);
};