const mongoose = require('mongoose');
const Joi = require('joi');
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

const User = mongoose.model('User', userSchema);

function validate(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(6).max(255).required()
    });
    
    return schema.validate(user, (err) => {
        if(err) console.log('Validation failed');
    });
};

module.exports.User = User;
module.exports.validate = validate;