// const cookieSession = require("cookie-session");
const path = require("path");
const session = require("express-session");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const index = require("./routes/index");
const dashboard = require("./routes/dashboard");
const users = require("./routes/users");

const queries = require("./controllers/queries");
const app = express();
app.set("views", "./views");
app.set('view engine', 'pug');


passport.use(new LocalStrategy(
  {
    usernameField: "email-input",
    passwordField: "password-input"
  },
  function(username, password, done){
    queries.getUserByEmail(username)
      .then(user =>{
        if (user === null){
          console.log("no user found");
          done(null, false);
        }else{
          queries.checkUserCredentials(password, user.password)
            .then(result =>{
              if (result === true){
                console.log("USER",user);
                done(null, user);
              }else{
                done(null, false);
              }
            });
        }
      });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  queries.getUserById(id)
    .then(user =>{
      done(null, user);
    });
});
// require('./config/passport')(passport);
app.use(morgan("dev"));

app.use(session({ secret: "cats" }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname+ '/public')));

app.use("/", index);
app.use("/dashboard", dashboard);
app.use("/users", users);


app.listen(3000, function(){
  console.log("App Running");
});

module.exports = {
  app
};
