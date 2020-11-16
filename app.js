const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const MySheme = require('./model/sheme')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());

const UserDB = {
  username:"user1",
  password:"pass1"
}


passport.use(new LocalStrategy({ },
    function(username, password, done) {
        console.log('strat')
        const user = UserDB;
        if(user.username == username && user.password == password){
            return done(null, user);
        }else{
            console.log('nevern') 
            return done(null, false);
        }
    }

  ));

const User = mongoose.model('user', MySheme);

  
// app.post('/', 
//   passport.authenticate('local', { failureRedirect: '/' ,session: false}),
//   function(req, res) {
//     res.redirect('/app');
//   });





app.use('/mass',async (req,res)=>{
  console.log('mass')
  let test;
  let dat = await User.find({},(err,doc)=>{
    test = doc
  });
  res.json(test)
})

  // app.use('/app',  passport.authenticate('local', { failureRedirect: '/' ,session: false}),
  //   (req,res)=>{
  //   console.log('app')
  //   res.sendFile(__dirname + '/public/app.html')
  // })

    app.use('/app',
    (req,res)=>{
    console.log('app')
    res.sendFile(__dirname + '/public/app.html')
  })

  app.post('/bd',(req,res)=>{
    console.log('bd')
    console.log(req.body)
    let saveUser = new User(req.body)
    saveUser.save();
    })

  app.use('/',(req,res)=>{
    console.log('/')
    res.sendFile(__dirname + '/public/login.html')
    })





async function start (){
  try{
      mongoose.connect("mongodb+srv://dataBase:1q2w3e@cluster0.ejvhd.mongodb.net/collect1", { useNewUrlParser: true ,useUnifiedTopology: true},()=>{
      app.listen(3000,()=>{
          console.log('server is done')
      })
  });
  }catch(e){
      console.log(e)
  }
  }start()

