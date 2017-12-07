// const cookieSession = require("cookie-session");
const path = require("path");
const session = require("express-session");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;

const index = require("./routes/index");
const dashboard = require("./routes/dashboard");
const users = require("./routes/users");
const serials = require("./routes/serials")
const app = express();
app.set("views", "./views");
app.set('view engine', 'pug');

// require('./config/passport')(passport);
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(cookieParser("cats"));
app.use(session({
  secret: "cats",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname+ '/public')));

const User = require("./database/mongo/user");
passport.use("local-signup", new LocalStrategy(
  {
    usernameField: "email",
    passReqToCallback: true
  },
  function(req, email, password, done){
    console.log(email);

    User.findOne({email})
      .then(async (error, user) => {
        if (error){
          return done(error);
        }

        if (user){
          console.log("Email in use")
          return done (null, false);
        }else{
          console.log(req.body);
          const newUser = new User({
            email: req.body.email,
            username: req.body['screen-name'],
            firstName: req.body['first-name'],
            lastName: req.body['last-name'],
            birthdate: req.body.birthdate,
            joinDate: Date.now()
          });

          newUser.password = await newUser.generateHash(password);
          newUser.save(function(err){
            if (err) throw err;
            return done(null, newUser);
          });
        }
      })
      .catch(e => {
        throw e;
      });
  }
));

passport.use("local-login", new LocalStrategy(
  {
    usernameField: "email"
  },
  function(email, password, done){
    User.findOne({email: email})
      .then(async (user) => {
        console.log("user", user);
        console.log("pass", password)
        if (!user){
          return done(null, false);
        }else{
          console.log("pass", password)

          const validPassword = await user.validatePassword(password);
          if (validPassword){
            return done(null, user);
          } else{
            return done(null, false);
          }
        }
      })
      .catch(e => {
        return done(e);
      });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
const mongooseOptions = {
  useMongoClient: true
};
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/serialized", mongooseOptions);

app.use("/", index);
app.use("/dashboard", dashboard);
app.use("/users", users);
app.use("/serials", serials);

app.use(function(req, res, next){
  const err = new Error("Resource not Found");
  err.status = 404;
  next(err);
});

app.use(function(error, req, res, next){
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  })
  next(error);
});
app.listen(3000, function(){
  console.log("App Running");
});

module.exports = {
  app
};
