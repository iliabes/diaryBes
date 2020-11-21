const express = require('express')
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const MySheme = require('../model/sheme')
const mutler = require('multer')


router.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(mutler({dest:'upload'}).single('filedata'))



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

const User =  mongoose.model('user', MySheme);
// app main aut


  app.use('/app',  passport.authenticate('local', { failureRedirect: '/login' ,session: false}),
    (req,res)=>{
    console.log('app')
    res.sendFile(process.cwd() + '/public/app.html')
  })





// router.use('/app',
//     (req,res)=>{
//     console.log('app')
//     res.sendFile(process.cwd() + '/public/app.html')
//   })

 

  //send item
  router.use('/mass',async (req,res)=>{
  console.log('mass')
  let test;
  let dat = await User.find({},(err,doc)=>{
    test = doc
  });
  res.json(test)
})

//remove item
router.post('/removeElem',(req,res)=>{
    console.log('remove')
    console.log(req.body.id)
    User.findOneAndRemove({_id: req.body.id},(err,doc)=>{
      if(err){console.log(err)}
      console.log('this elem if deleted:' + doc)
    })
    })

//save item
router.post('/bd',(req,res)=>{
console.log('bd')
console.log(req.body)
let saveUser = new User(req.body)
saveUser.save((err)=>{
if(err){console.log(err)}
console.log('save is :' + saveUser)
});
})

//update item
      router.post('/refresh',(req,res)=>{
        console.log('bd')
        console.log(req.body)
      User.updateOne({_id: req.body.id}, 
      {value: req.body.value,
      data: req.body.data,
      work: req.body.work,
      work2: req.body.work2,
      list: req.body.list,
      good: req.body.good}, function(err, result){
        if(err) return console.log(err);
        console.log(result);
    });
        })


//load img
  router.post('/upload',async (req,res,next)=>{
      let filedata = await req.file;
      console.log(filedata)
      if(!filedata){
        res.send('filure')
      }else{
        res.send('file download')
      }
    })

router.use('/login',(req,res)=>{
      console.log('/login')
      res.sendFile(process.cwd() + '/public/login.html')
      })
      
app.post('/login', 
      passport.authenticate('local', { failureRedirect: '/login' ,session: false}),
      function(req, res) {
        res.sendFile(process.cwd() + '/public/app.html')
      });
    

module.exports = router;