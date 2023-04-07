const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");


class CourseController {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
  
  saveCourse(req,res,next){
    const data = req.body
    console.log(data)

  }
  allCourses(req, res, next) {
    Course.find({})
    .then((courses) => {
      res.render("courses/courses", {
        user:req.user,
        courses: mutipleMongooseToObject(courses),
      });
    })
    .catch(next);
  }
  
  courseLearn(req, res, next) {   
    Course.findOne({ slug: req.params.slug })
    .populate({
              path:'author lecture',
          })
    .then((course) =>{
      res.render("courses/courseLearn",{
        user:req.user,
        course : mongooseToObject(course),
        
      })
      // res.render("test3",{layout:false,course:mongooseToObject(course)})
      // res.json(course.lecture)
    })
    .catch(next);
    
  }
  courseDetail(req,res,next){
    Course.findOne({ slug: req.params.slug })
    .populate({
              path:'author lecture',
          })
    .then((course) =>{
      res.render("courses/courseDetail",{
        user:req.user,
        course : mongooseToObject(course),
        
      })
      // res.render("test3",{layout:false,course:mongooseToObject(course)})
      // res.json(course.lecture)
    })
    .catch(next);
  }
  
 
  // [GET] cousrse/tag/:slug
}

module.exports = new CourseController();
