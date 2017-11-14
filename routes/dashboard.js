const express = require("express");
const queries = require("../controllers/queries");
const passport = require("passport");
const router = express.Router();

router.get("/", function(req, res){
  console.log(req.session);
  res.render("dashboard");
});




module.exports = router;
