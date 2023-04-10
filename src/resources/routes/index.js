const coursesRouter = require("./courses");
const siteRouter = require("./site");
const loginRouter = require("./login");
const registerRouter = require("./register");
const profileRouter = require('./profile')
const adminRouter = require("./admin");
const testRouter = require("./test");
const passport = require('passport')
function route(app) {
  app.use("/profile", profileRouter)
  app.use("/test", testRouter);
  
  //Thành
  app.use("/contact", function (req, res) {
    res.render("contact");
  });
  app.use("/about-us",function (req, res) {
    res.render("about-us");
  })
  
  //Tùng Gầy
  app.use("/courses", coursesRouter);
  //
  //Nguyên Vũ
  app.use("/register", registerRouter);
  app.use("/login", loginRouter);
  app.get('/logout', (req, res) => {
    // Call req.logout() with a callback function
    req.logout((err) => {
      if (err) {
        // Handle error
        console.error(err);
        return res.redirect('/'); // Redirect to home page or any other appropriate page
      }
      // Redirect to home page or any other appropriate page after successful logout
      res.redirect('/');
    });
  });
  //
  //Toán
  app.use("/admin", adminRouter);
  //
  //BÉO
  app.use("/", siteRouter);
  //THÀNH
  app.use("*", function (req, res) {
    res.status(404).render("404");
  });
}

module.exports = route;
