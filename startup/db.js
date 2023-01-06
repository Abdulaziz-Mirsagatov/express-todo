const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', 'false');

module.exports = async () => {
    try{
        await mongoose.connect(process.env.DB);
    }
    catch(err){
        console.error(err);
    }
};