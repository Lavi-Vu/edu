const Course = require("../models/Course");
const account = require("../models/account");
const author = require("../models/author")
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const mongoose = require('mongoose');

class adminController {
  //[GET] /admin
  show(req, res, next) {
    Course.find({})
      .populate({
        path: 'author',
        select: 'name _id',

      })
      // .select('name')
      .then((data) => {
        res.render('admin/coursesManage',{
            data: mutipleMongooseToObject(data),
            layout: false,
          })
      })
      .catch(next);
  }
  //[GET] admin/account
  showAccount(req, res, next) {
    account.find({})
    .populate({
      path:'list_course',
      select: 'name '
    })
    .then((data) => {
        res.render("admin/accountManage", {
          data: mutipleMongooseToObject(data),
          layout: false,
        });
      })
      .catch(next);
  }
   //[GET] /admin/account/:id
  showAccountDetail(req,res,next){
    account.findById({
      _id: req.params.id
    })
    .populate({
      path:'list_course',
    //   populate: {
    //     path:'author',
    //     select: 'name '
    // },
      select: 'name '
    })
    .then((data) => {
      // var dataListCourse = data.list_course.toObject()
      var dataListCourse = Object.assign({},data.list_course)
      res.json(dataListCourse)

      })
      
    
  }
  //[GET] /admin/add
  addCourse(req, res, next) {
    res.render("admin/addCourse", { layout: false });
  }
  //[POST] /admin/add
  addSaveCourse(req, res, next) {
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/mqdefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/admin'))
            .catch((error) => {});
  }
  // [GET] /admin/:id/edit
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
      .then(() => res.redirect("/admin"))
      .catch(next);
  }
  //[DELETE] /admin/:id/delete
  destroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/admin"))
      .catch(next);
  }
}
module.exports = new adminController();
