const { Schema, model } = require('mongoose')


const userScheme = new Schema({
    value: String,
    work:Number,
    work2:Number,
    list:Number,
    good:Boolean,
    data:String
});


module.exports = {userScheme}