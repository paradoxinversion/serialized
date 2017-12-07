const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", function(req, res) {
  if (req.session.passport && req.session.passport.user){
    res.render("serials", {user:req.session.passport.user});
  }else{
    res.render("serials");
  }

});

router.get("/:username", function(req, res) {
  if (req.session.passport.user){
    res.render("serials-user", {user:req.session.passport.user});
  }else{
    res.render("serials-user");
  }
});

router.get("/:username/new", function(req, res) {
  if (req.session.passport.user){
    res.render("serials-new", {user:req.session.passport.user});
  }else{
    res.render("serials-new");
  }
});

router.get("/:username/:serialName", function(req, res) {
  if (req.session.passport.user){
    res.render("serials-overview", {user:req.session.passport.user});
  }else{
    res.render("serials-overview");
  }
});

router.get("/:username/:serialName/:serialPart", function(req, res) {
  if (req.session.passport.user){
    res.render("serials-part", {user:req.session.passport.user});
  }else{
    res.render("serials-part");
  }
});
module.exports = router;
