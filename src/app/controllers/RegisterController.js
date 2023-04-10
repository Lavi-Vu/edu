const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const User = require("../models/User")
class RegisterController {
  //[GET] /register
  getRegisterSite(req, res) {
    res.render("login/register", { layout: false });
  }
 
  ///[POST] Register
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
  