const mongoose = require('mongoose');

const Task = mongoose.model('Task', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
}));

module.exports = Task;