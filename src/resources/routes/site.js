const express = require('express')
const router = express.Router()

const siteController = require('../../app/controllers/SiteController')

// router.get('/search', siteController.search);
// router.get('/:slug', siteController.test)
router.get('/', siteController.home)
router.get("*", function (req, res) {
    res.status(404).render("404");
  });
module.exports = router
