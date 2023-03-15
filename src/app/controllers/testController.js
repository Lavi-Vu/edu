const Course = require("../models/Course")
const author = require("../models/author");
const account = require("../models/account")
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");

class testController {
    show(req,res,next){
      account.findById({
        _id: req.params.id
      })
      .populate({
        path:'list_course',
        select: 'name '
      })
      .then((data) => {
        console.log(data.list_course)
      })
    }
  // show(req, res, next) {
    
    //   .find({name : 'Nguyên Vũ'})
    //   .populate('list_course')
    //   .then((data) => {
        
    //     res.json(data)
    //   })
    //   .catch(next)
    // }
        
    //       })    //     // res.render("test", {
    //     //     userData,
    //     //     layout: false,
    //     //   });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // author.find({}).populate('list_course').exec(function (err, author) {
    //   if (err) return handleError(err);
    //   console.log('The user with courses is:', author);
    // });
    // show(req, res, next) {
    //   Course.find({})
    //   .populate({
    //     path: 'author',
    //     select: 'name _id',

    //   })
    //   // .select('name')
    //   .then((data) => {
    //     console.log(data)
    //     res.render('admin/coursesManage',{
    //         data: mutipleMongooseToObject(data),
    //         layout: false,
    //       })
        
        // data = data.forEach(data => {
        //   var userData = data.toObject()
        //   console.log(userData.author.name)
          // res.json(mutipleMongooseToObject(userData))
          // res.render('admin/coursesManage',{
          //   data: mutipleMongooseToObject(data),
          //   layout: false,
          // })
          // console.log(userData.name,userData.email);
          // userData.list_course.forEach(course => {
          //     console.log(course)
          // })
          // console.log(userData)
      // })

      // })
      // .catch(next);
               
// }
}
module.exports = new testController();
