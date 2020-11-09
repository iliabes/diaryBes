module.exports = function (app){
    app.use('/app',(req,res)=>{
        res.sendFile(__dirname + '/public/app.html')
      })
      
    app.use('/',(req,res)=>{
    res.sendFile(__dirname + '/public/login.html')
    })
      
}