const express = require('express');
const router = express.Router();
const app = express();
const auth = require("../../middleware/auth")


const CourseController = require("../../app/controllers/CoursesController");

router.post('/save',CourseController.saveCourse)
router.get('/learn/:slug',CourseController.ensureAuthenticated,CourseController.courseLearn);
router.get('/detail/:slug',CourseController.courseDetail);
router.get("/", CourseController.allCourses);

module.exports = router;
