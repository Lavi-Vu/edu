const express = require("express");
const router = express.Router();

const testController = require("../../app/controllers/testController")

router.get('/:id',testController.show)

module.exports = router;
