const express = require("express");
const { TRUE } = require("node-sass");
const router = express.Router();

const adminController = require("../../app/controllers/adminController");
const LoginController = require("../../app/controllers/LoginController");

// router.get("/author/:id", adminController.editCourse);
router.delete("/:id/delete", adminController.destroy);
router.put("/list-courses/:id/edit", adminController.updateCourse);
router.get("/list-courses/:id/edit", adminController.editCourse);
router.post("/list-courses/add", adminController.addSaveCourse);
router.get("/list-courses/add", adminController.addCourse);
router.get("/list-courses",adminController.listCourses)
// router.get("/account",adminController.showAccount)
// router.get("/account/:id",adminController.showAccountDetail)
router.get("/", adminController.dashboard);


module.exports = router;
