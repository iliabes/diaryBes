const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {userScheme} = require('./model/sheme')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
app.use(express.static(__dirname + "/public"));




require('./routes')(app)



const User = mongoose.model("User", userScheme);
const user = new User({
    value: "sgtring string",
    work:1,
    work2:12,
    list:4,
    good:true,
    data:"data string"
});


// user.save(function(err){    
//     if(err) return console.log(err);
//     console.log("Сохранен объект", user);
// });



async function start (){
try{
    mongoose.connect("mongodb+srv://dataBase:1q2w3e@cluster0.ejvhd.mongodb.net/collect1", { useNewUrlParser: true ,useUnifiedTopology: true},()=>{
    app.listen(3000)
});
}catch(e){
    console.log(e)
}
}start()

