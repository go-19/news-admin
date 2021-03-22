const express = require("express");
const routes = express.Router();

const Home = require("./controllers/home");
const About = require("./controllers/about");
const Signup = require("./controllers/signup");
const More = require("./controllers/more");
const Login = require("./controllers/login");
const readMore = require("./controllers/read-more");
const Admin = require("./controllers/admin");

routes.get("/", Home.GET);

routes.get("/about", About.GET);

routes.route("/signup")
.get(Signup.GET)
.post(Signup.POST);

routes.get("/more", More.GET);

routes.route("/login")
.get(Login.GET)
.post(Login.POST);

routes.get("/read-more/:id", readMore.GET);

routes.route("/admin")
.get(Admin.GET)
.post(Admin.POST);

module.exports = routes;