const Course = require('../models/Course');
const User = require('../models/User')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose')
class SiteController {
  // [GET] /
  // index(req, res, next) {
  //     Course.find({})
  //         .then((courses) => {
  //             res.render('home', {
  //                 courses: mutipleMongooseToObject(courses),
  //             });
  //         })
  //         .catch(next);
  // }

  // [GET] /search

  // search(req, res) {
  //     res.render('search');
  // }
  // test(req, res, next) {   
  //   Course.findOne({ slug: req.params.slug })
  //   .then((course) =>{
  //     res.render("courses/courseDetail",{
        
  //       course : mongooseToObject(course),
        
  //     })
  //   })
  //   .catch(next);
    
  // }
  //GET /
  home(req, res,next) {
    
        Course.find({})

        .then((courses)=> {
          const user = req.user
          // res.status(200).json(courses)
          res.render('home',{user: mongooseToObject(user),courses : mutipleMongooseToObject(courses) })
          })
  
  
  .catch(next)
}
}

module.exports = new SiteController();
