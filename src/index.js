const path = require("path");
const express = require("express");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const db = require("./config/db/index");
const route = require("./resources/routes");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./app/models/User')
const mongoose = require('mongoose');
const store = session.MemoryStore();
// Use express-session to check login
app.use(session({
  secret: 'Eduport', // changes this to encrypt 
  resave: false,
  saveUninitialized: false,
  store
}));

// db.connect()
// app.use(
//   express.urlencoded({
//       extended: true,
//   }),
// );
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

//Template engine
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    defaultLayout:'main',
    
  }),
  
);

app.set("views", path.join(__dirname, "resources", "views"));
app.set("view engine", "hbs");
app.set('view options', { layout: 'other'});

//static
// Use static folder
app.use(express.static(path.join(__dirname, "/public")));




app.use(passport.initialize());
app.use(passport.session());

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
