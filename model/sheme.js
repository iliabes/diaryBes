const { Schema, model } = require('mongoose')


const userScheme = new Schema({
    value: {
        type: String,
        default: 'defString'
    },
    work:{
        type: String,
        default: 'defWork'
    },
    work2:{
        type: String,
        default: 'defDdeal'
    },
    list:{
        type: String,
        default: 'defList'
    },
    good:{
        type: String,
        default: 'defGood'
    },
    data:{
        type: String,
        default: 'defdata'
    },
});


module.exports = {userScheme}