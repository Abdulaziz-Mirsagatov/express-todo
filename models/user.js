const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: []
    }]
});

userSchema.methods.genAuthToken = function() {
    return jwt.sign({_id: this._id}, "mySecretKey");
};

function validate(obj) {
    const Joi = require('joi');
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(5).max(30).email().required(),
        password: Joi.string().min(6).max(30).required()
    });

    return schema.validate(obj);
}

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validate = validate;