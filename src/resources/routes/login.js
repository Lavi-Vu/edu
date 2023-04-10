const express = require("express");
const router = express.Router();
const passport = require('passport')
const LoginController = require("../../app/controllers/LoginController");
// const authController = require('../../middleware/auth');
const authController = require("../../middleware/auth")
// router.get('/search', siteController.search);
// router.post('/register', LoginController.login)
router.get('/auth/facebook/callback',
	  authController.facebookAuthCallback,
	  function(req, res) {
	    res.redirect('/');
	  });
router.get('/auth/facebook', authController.facebookAuth);
router.post('/',authController.localAuth)
router.get("/", LoginController.loginSite);
router.get("*", function (req, res) {
    res.status(404).render("404");
  });
module.exports = router;
