const express = require("express");

const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const router = express.Router();

router.get("/", ensureLoggedIn(), function(req, res){
  console.log(req.session)
  res.render("dashboard", {user: req.user});
});


module.exports = router;
