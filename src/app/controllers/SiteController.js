const Course = require('../models/Course');
const User = require('../models/User')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose')
class SiteController {
  
  //GET /
  home(req, res,next){
        Course.find({})
        .then((courses)=> {
          const user = req.user
          // res.json(courses)
          res.render('home',{user: mongooseToObject(user),courses : mutipleMongooseToObject(courses) })
          })
        .catch(next)
}
}

module.exports = new SiteController();
