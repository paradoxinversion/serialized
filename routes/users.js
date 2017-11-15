const path = require("path");
const express = require("express");
const queries = require("../controllers/queries");
// const passport = require("passport");
// const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();
const router = express.Router();

router.get("/profile/:userId", function(req, res){
  queries.getUserById(req.params.userId)
    .then(user => {
      let userOwnsProfile;
      console.log(req.params.userId)
      // console.log(req.user.id)
      if (req.user){
        if (req.params.userId == req.user.id){
          userOwnsProfile = true;
          console.log("User DOES own profile!");
        }else{
          userOwnsProfile = false;
        }
      }

      res.render("profile", {user, userOwnsProfile});
    });

});



module.exports = router;
