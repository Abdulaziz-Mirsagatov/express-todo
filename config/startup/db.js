const mongoose = require('mongoose');

mongoose.set('strictQuery', 'false');

module.exports = () => {
    mongoose.connect("mongodb://localhost/todo", () => {
        console.log("Connected to database...");
    });
};