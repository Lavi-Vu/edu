const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const User = require('../models/User')

class CourseController {
  //Xác thực đăng nhập 
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
  //[GET] /courses/
  allCourses(req, res, next) {
    Course.find({})
    .then((courses) => {
      res.render("courses/courses", {
        user:mongooseToObject(req.user),
        courses: mutipleMongooseToObject(courses),
      });
    })
    .catch(next);
  }
  //[GET] /courses/learn
  courseLearn(req, res, next) {   
    const user = req.user
    Course.findOne({ slug: req.params.slug })
    .populate({
              path:'author lecture',
          })
    .then((course) =>{
      user.list_course.push(course.id);
      user.save()
      res.render("courses/courseLearn",{
        user:mongooseToObject(user),
        course : mongooseToObject(course),
        
      })
      console.log(user)
     
    })
    .catch(next);
    
  }
  //[GET ]/courses/learn
  courseDetail(req,res,next){
    Course.findOne({ slug: req.params.slug })
    .populate({
              path:'author lecture',
          })
    .then((course) =>{
      res.render("courses/courseDetail",{
        user:mongooseToObject(req.user),
        course : mongooseToObject(course),
       
      })
     
    })
    .catch(next);
  }
  
}

module.exports = new CourseController();
