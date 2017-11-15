const express = require("express");
const queries = require("../controllers/queries");
const passport = require("passport");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const router = express.Router();

router.get("/", ensureLoggedIn(), function(req, res){
  res.render("dashboard", {user: req.user});
});


module.exports = router;
