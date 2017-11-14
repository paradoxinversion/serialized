const express = require("express");
const queries = require("../controllers/queries");
const passport = require("passport");
const router = express.Router();

router.get("/", function(req, res){
  res.render("index");
});

router.route("/login")
  .get(function(req, res){
    res.render("log-in");
  });

router.post("/login", passport.authenticate('local', {
  successRedirect: '/yay',
  failureRedirect: '/boo' }));
router.route("/signup")
  .get( function(req, res){
    res.render("sign-up");
  })
  .post( function(req, res){
    console.log(req.body);
    const user = req.body;
    return queries.addNewUser(
      user['screen-name-input'],
      user['email-input'],
      user['password-input'],
      user['first-name-input'],
      user['last-name-input'],
      user['birthdate-input']
    )
      .then(() =>{
        res.send("Sign Up Succeeded");
      });
    // res.send("Logged in action");
  });



module.exports = router;
