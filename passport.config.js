let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;


const User = {
    username:"user1",
    password:"pass1"
  }


passport.use(new LocalStrategy(
    console.log("username, password"),
      function(username, password, done) {
        
        User.username, function (err, user) {
          if (err) { return done(err); }
          console.log('user')
          if (!user) { return done(null, false); }
          if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        };
      }
    ));