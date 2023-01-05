const mongoose = require('mongoose');

const Task = mongoose.model('Task', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
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

function validate(obj) {
    const Joi = require('joi');
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        date: Joi.date(),
        completed: Joi.boolean()
    });

    return schema.validate(obj);
};

module.exports.Task = Task;
module.exports.validate = validate;