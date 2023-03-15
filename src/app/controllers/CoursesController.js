const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  show(req, res, next) {   
    Course.findOne({slug: req.params.slug})
    .then((course)=>{
      res.render('courses/course',{layout:'other',title:'other layout',course: mongooseToObject(course)})
    })
    .catch(next)
    // res.render('courses/course')
  }
    allCourses(req, res, next) {
      Course.find({})
        .then((courses) => {
          res.render("courses/courses", {
            title: "layout2 page",
            layout: "other",
            courses: mutipleMongooseToObject(courses),
          });
        })
        .catch(next);
    }

  
 
  // [GET] cousrse/tag/:slug
}

module.exports = new CourseController();
