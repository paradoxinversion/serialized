const express = require("express");
const passport = require("passport");
const router = express.Router();
router.get("/", function(req, res){
  res.render("index", {user:req.user});
});

router.route("/login")
  .get(function(req, res){
    res.render("log-in");
  })
  .post( passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  }));

router.route("/signup")
  .get(function(req, res){
    res.render("sign-up");
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
  }));

router.route("/logout")
  .get(function(req, res){
    req.session.destroy((err)=>{
      if (err) throw err;
    });
    res.redirect("/");
  });

module.exports = router;
