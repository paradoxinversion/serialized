const express = require("express");
const queries = require("../controllers/queries");
const passport = require("passport");
const router = express.Router();

router.get("/", function(req, res){
  res.render("index", {user:req.user});
});

router.route("/login")
  .get(function(req, res){
    res.render("log-in");
  })
  .post(
    passport.authenticate('local', {
      failureRedirect: '/login' }),
    function(req, res){
      res.redirect('/dashboard');
    });
//
// router.post("/login", passport.authenticate('local', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/login' }));

router.route("/signup")
  .get(function(req, res){
    res.render("sign-up");
  })
  .post(function(req, res){
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
        res.redirect("/dashboard");
      });
    // res.send("Logged in action");
  });



module.exports = router;
