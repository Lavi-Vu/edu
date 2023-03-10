const express = require("express");
const router = express.Router();

const RegisterController = require("../../app/controllers/RegisterController");

// router.get('/search', siteController.search);
router.post("/", RegisterController.register);
router.get("/", RegisterController.getRegisterSite);

module.exports = router;
