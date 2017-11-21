const path = require("path");
const express = require("express");
const queries = require("../controllers/queries");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

// const passport = require("passport");
// const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();
const router = express.Router();

router.get("/profile/:userId", function(req, res){
  queries.getUserById(req.params.userId)
    .then(user => {
      let userOwnsProfile;
      if (req.user){
        if (req.params.userId == req.user.id){
          userOwnsProfile = true;
        }else{
          userOwnsProfile = false;
        }
      }

      res.render("profile", {user, userOwnsProfile});
    });

});

router.put("/profile/:userId", ensureLoggedIn(), function(req, res){
  queries.updateUserBiography(req.session.passport.user, req.body.text)
    .then((userData) =>{
      if (userData){
        res.end();
      } else{
        res.end();
      }
    });
});


module.exports = router;
