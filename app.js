
const express = require('express');
const app = express();




// app.use('/',require('./routes/app.js'))




const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const MySheme = require('./model/sheme')
const multer = require('multer')


//port !!!!!
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, "public/img");
  },
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(multer({storage:storageConfig}).single("filedata"));


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


//mongoose ----------------------------------


const User =  mongoose.model('user', MySheme);




  
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

//   app.use('/app',  passport.authenticate('local', { failureRedirect: '/' ,session: false}),
//     (req,res)=>{
//     console.log('app')
//     res.sendFile(__dirname + '/public/app.html')
//   })

    app.use('/app',
    (req,res)=>{
    console.log('app')
    res.sendFile(__dirname + '/public/app.html')
  })

  app.post('/removeElem',(req,res)=>{
    console.log('remove')
    console.log(req.body.id)
    User.findOneAndRemove({_id: req.body.id},(err,doc)=>{
      if(err){console.log(err)}
      console.log('this elem if deleted:' + doc)
    })
    })


    app.post("/upload", function (req, res, next) {
   
      let filedata = req.file;
      console.log(filedata);
      if(!filedata)
          res.send("Ошибка при загрузке файла");
      else
          res.send("Файл загружен");
  });


    app.post('/bd',(req,res,next)=>{
      console.log('bd')
      
      console.dir(req.body)
      console.log(req.body)
      let filedata;
      if(req.file){
        filedata = req.file;
        console.log("Файл загружен:" +filedata.filename);
      }
      // let saveUser = new User(req.body)
      let saveUser = new User({
        value:req.body.value,
        src:req.file ? filedata.filename : '',
        work:req.body.work,
        work2:req.body.work2,
        list:req.body.list,
        good:req.body.good})
      saveUser.save((err)=>{
        if(err){console.log(err)}
        console.log('save is :' + saveUser)
      });
      })

      app.post('/refresh',(req,res)=>{
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



  app.post('/upload',async (req,res,next)=>{
      let filedata = await req.file;
      console.log(filedata)
      if(!filedata){
        res.send('filure')
      }else{
        res.send('file download')
      }
    })

  app.use('/',(req,res)=>{
    console.log('/')
    res.sendFile(__dirname + '/public/login.html')
    })





async function start (){
  try{
      mongoose.connect("mongodb+srv://dataBase:1q2w3e@cluster0.ejvhd.mongodb.net/collect1", { useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify:false},()=>{
      app.listen(3000,()=>{
          console.log('server is done')
      })
  });
  }catch(e){
      console.log(e)
  }
  }start()

