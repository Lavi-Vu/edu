const coursesRouter = require("./courses");
const siteRouter = require("./site");
const loginRouter = require("./login");
const registerRouter = require("./register");
const profileRouter = require('./profile')
const adminRouter = require("./admin");
const testRouter = require("./test");

function route(app) {
  app.use("/profile", profileRouter)
  app.use("/test", testRouter);
  app.use("/register", registerRouter);
  app.use("/contact", function (req, res) {
    res.render("contact");
  });
  app.use("/about-us",function (req, res) {
    res.render("about-us");
  })
  app.use("/courses", coursesRouter);
  app.use("/login", loginRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);
  // app.use("*", function (req, res) {
  //   res.status(404).render("404");
  // });
}

module.exports = route;
