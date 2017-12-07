const express = require("express");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const User = require("../database/mongo/user");
const router = express.Router();

router.get("/profile/:username", function(req, res){
  User.findOne({username: req.params.username})
    .then(async (user) => {
      let isOwnedProfile;
      //if the session user matches the user who's page we're on
      if (req.session.passport.user){
        isOwnedProfile = true;
      }else{
        isOwnedProfile = false;
      }
      res.render("profile", {user, isOwnedProfile});
    })
    .catch(e => {
      throw e;
    });
});

router.put("/profile/:username", ensureLoggedIn(), function(req, res){
  User.findByIdAndUpdate(req.session.passport.user, { $set: { biography: req.body.text }}, { new: true, upsert: true })
    .then(user => {
      res.send(user);
    });
});

router.get("/:pageIndex", function(req, res){

  let user;
  if (req.session.passport && req.session.passport.user){
    user = req.session.passport.user;
  }
  User.find()
    .then(users => {
      res.render("users", {user, users});
    })
    .catch(error => {
      throw error;
    });

});
module.exports = router;
