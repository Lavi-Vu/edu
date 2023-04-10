const express = require('express');
const router = express.Router();
const app = express();
const auth = require("../../middleware/auth")

//Tùng gầy ALL
const CourseController = require("../../app/controllers/CoursesController");

// router.post('/save',CourseController.saveCourse)

router.get('/learn/:slug',CourseController.ensureAuthenticated,CourseController.courseLearn);
router.get('/detail/:slug',CourseController.courseDetail);
router.get("/", CourseController.allCourses);
router.get("*", function (req, res) {
    res.status(404).render("404");
  });
module.exports = router;
