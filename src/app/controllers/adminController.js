const Course = require("../models/Course");
const User = require('../models/User')
const author = require("../models/author")
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const mongoose = require('mongoose');

class adminController {
  
  //[GET] /admin
  dashboard(req,res,next){
    res.render('admin/dashboard',{
      layout:'admin',
    })
  }
  //[GET] /list-courses
  listCourses(req, res, next) {
    Course.find({})
      .populate({
        path: 'author',
        select: 'name _id',

      })
      // .select('name')
      .then((data) => {
        res.render('admin/coursesManage',{
            data: mutipleMongooseToObject(data),
            layout: 'admin',
          })
      })
      .catch(next);
  }
  //[GET] admin/user
  showUser(req, res, next) {
    User.find({})
    // .populate({
    //   path:'list_course',
    //   select: 'name '
    // })
    .then((data) => {
        res.render("admin/accountManage", {
          data: mutipleMongooseToObject(data),
          layout: 'admin',
        });
      })
      .catch(next);
  }
   //[GET] /admin/user/detail/id
  showUserDetail(req,res,next){
    User.findById({_id :req.params.id})
    .populate({
        path: 'list_course',
        

      })
    .then((data)=>{
        res.render('profile/indexProfile',{
            data:mongooseToObject(data)
        })
    })
    .catch(next)
    }


//[DELETE]/user/:id/delete
destroyUser(req, res, next) {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.redirect("/admin/user"))
    .catch(next);
}
  //[GET] /admin/list-courses/add
  addCourse(req, res, next) {
    res.render("admin/addCourse", { layout:false });
  }
  //[POST] /admin/add
  // addSaveCourse(req, res, next) {
  //   req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/mqdefault.jpg`;
  //       const course = new Course(req.body);
  //       course
  //           // .save()
  //           // .then(() => res.redirect('/admin'))
  //           // .catch((error) => {});
  //       console.log(course);
  // }
  //[POST] /admin/list-courses/add
    // async addSaveCourse(req,res,next){
    //   const course = new Course(req.body);
    //   try{
    //     console.log(course)
    //     // await course.save();
    //     // res.redirect("/admin/list-courses")
    //   }
    //   catch (error){
    //     console.log(error)
    //   }
    //   };
      addSaveCourse(req,res,next){
        var course = req.body;
        delete course.search_terms;
        author.findOne({name : course.author})
        .then((data)=>{
          if(data){
            course.author = data._id
            course = new Course(course)
            course.save()
            .then(()=>{
              res.redirect("/admin/list-courses")
            })
            .catch()
          }
          else{
            res.send("ERROR!!!")
          }
        })
        .catch(next)
        
      }
      
    
  // [GET] /admin/list-courses/:id/edit
  editCourse(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("admin/editCourse", {
          course: mongooseToObject(course),
          layout: false,
        })
      )
      .catch(next);
  }
  // [PUT] /admin/:id/edit
  updateCourse(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin/list-courses"))
      .catch(next);
  }
  //[DELETE] /admin/list-courses/:id/delete
  destroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/admin/list-courses"))
      .catch(next);
  }
}
module.exports = new adminController();
