const express = require('express')
const router = express.Router()
const ProfileController = require('../../app/controllers/ProfileController')


// router.get('/edit',ensureAuthenticated,ProfileController.EditProfile)

router.get('/',ensureAuthenticated,ProfileController.ShowProfile)
router.get("*", function (req, res) {
  res.status(404).render("404");
});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }

module.exports = router