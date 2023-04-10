const express = require("express");
const router = express.Router();

const RegisterController = require("../../app/controllers/RegisterController");


router.post("/", RegisterController.register);
router.get("/", RegisterController.getRegisterSite);
router.get("*", function (req, res) {
    res.status(404).render("404");
  });
module.exports = router;
