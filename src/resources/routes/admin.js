const express = require("express");
const { TRUE } = require("node-sass");
const router = express.Router();

const adminController = require("../../app/controllers/adminController");
const LoginController = require("../../app/controllers/LoginController");

router.get("/author/:id", adminController.editCourse);
router.delete("/:id/delete", adminController.destroy);
router.put("/:id/edit", adminController.updateCourse);
router.get("/:id/edit", adminController.editCourse);
router.post("/add", adminController.addSaveCourse);
router.get("/add", adminController.addCourse);
router.get("/", adminController.show);
router.get("/account",adminController.showAccount)
router.get("/account/:id",adminController.showAccountDetail)

module.exports = router;
