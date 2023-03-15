const account = require("../models/account");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const jwt = require("jsonwebtoken");

class LoginController {
  //[GET] /login
  loginSite(req, res) {
   
    res.render("login/login", { layout: false });
  }
  //[POST] //login
  login(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    //check admin
    if (email == "admin@admin.com" && password == "admin") {
      // req.session.isLoggedIn = true;
      return res.redirect("/admin");
    }
    // not admin then check normal account
    else {
      account
        .findOne({
          email: email,
          password: password,
        })
        .then((data) => {
          if (data) {
            var token = jwt.sign(
              {
                _id: data._id,
              },
              "mk"
            );
            res.cookie("authToken", token, { httpOnly: true, maxAge: 300000 }); // expires after 5 minutes
            res.send("Login successful !! Welcome to Dashboard");
          } else {
            res.json("LOGIN FAIL !!!");
          }
        })
        .catch(next);
    }
  }
}

module.exports = new LoginController();
