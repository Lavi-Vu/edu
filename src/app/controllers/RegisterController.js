const account = require("../models/lecture");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User")
class RegisterController {
  //[GET]
  getRegisterSite(req, res) {
    res.render("login/register", { layout: false });
  }
  //[POST]

  //test
  // register(req, res){
  //     console.log(req.body)
  // }

  /// Register OK
  async register(req,res){
    try {
      const user = new User(req.body)
      await user.save()
      const token = await user.generateAuthToken()
      res.redirect('home')
  } catch (error) {
      res.status(400).send(error)
  }
  }
}

module.exports = new RegisterController();
  