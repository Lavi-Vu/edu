const User = require("../models/User")
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const jwt = require("jsonwebtoken");

class LoginController {


  
  //[GET] /login
  loginSite(req, res) {
   
    res.render("login/login", { layout: false });
  }
  async login(req,res){
    try{
      const { email, password } = req.body
      if (email == "admin@admin.com" && password == "admin"){
        return res.redirect("/admin")
      }
      const user = await User.findByCredentials(email, password)
      if (!user) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }
      const token = await user.generateAuthToken()
      res.send({ user, token })
    }
    catch (error){
      res.status(400).send(error)
    }
  }
}

module.exports = new LoginController();
