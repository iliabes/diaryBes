const express = require('express');
const router = express.Router();

router.use('/app',
    (req,res)=>{
    console.log('app')
    res.send('sdfsdf')
  })

  router.use('/ap',
    (req,res)=>{
    console.log('app')
    res.send('1')
  })

module.exports = router;


// const User =  mongoose.model('user', MySheme);

  
// app.post('/', 
//   passport.authenticate('local', { failureRedirect: '/' ,session: false}),
//   function(req, res) {
//     res.redirect('/app');
//   });


  //   app.use('/app',
  //   (req,res)=>{
  //   console.log('app')
  //   res.sendFile(__dirname + '/public/app.html')
  // })

  //---------------

// app.use('/mass',async (req,res)=>{
//   console.log('mass')
//   let test;
//   let dat = await User.find({},(err,doc)=>{
//     test = doc
//   });
//   res.json(test)
// })

//   app.use('/app',  passport.authenticate('local', { failureRedirect: '/' ,session: false}),
//     (req,res)=>{
//     console.log('app')
//     res.sendFile(__dirname + '/public/app.html')
//   })


//   app.post('/removeElem',(req,res)=>{
//     console.log('remove')
//     console.log(req.body.id)
//     User.findOneAndRemove({_id: req.body.id},(err,doc)=>{
//       if(err){console.log(err)}
//       console.log('this elem if deleted:' + doc)
//     })
//     })

//     app.post('/bd',(req,res)=>{
//       console.log('bd')
//       console.log(req.body)
//       let saveUser = new User(req.body)
//       saveUser.save((err)=>{
//         if(err){console.log(err)}
//         console.log('save is :' + saveUser)
//       });
//       })

//       app.post('/refresh',(req,res)=>{
//         console.log('bd')
//         console.log(req.body)
//       User.updateOne({_id: req.body.id}, 
//       {value: req.body.value,
//       data: req.body.data,
//       work: req.body.work,
//       work2: req.body.work2,
//       list: req.body.list,
//       good: req.body.good}, function(err, result){
//         if(err) return console.log(err);
//         console.log(result);
//     });
//         })



//   app.post('/upload',async (req,res,next)=>{
//       let filedata = await req.file;
//       console.log(filedata)
//       if(!filedata){
//         res.send('filure')
//       }else{
//         res.send('file download')
//       }
//     })

//   app.use('/',(req,res)=>{
//     console.log('/')
//     res.sendFile(__dirname + '/public/login.html')
//     })


