const express = require("express");
const router = express.Router();

const CourseController = require("../../app/controllers/CoursesController");

// router.get("/python/:slug", CourseController.show);
// router.get('/c/:slug', CourseController.cplus)
// router.get('/js/:slug', CourseController.js)
// router.get('/js', CourseController.js)
// router.get('/c', CourseController.cplus)
// router.get("/python", CourseController.python);
router.get('/:slug',CourseController.show)
router.get("/", CourseController.allCourses);

module.exports = router;
