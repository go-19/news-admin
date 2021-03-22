const express = require("express");
const app = express();

app.set("view engine", "html");

const Signup = require("../models/signup");

module.exports = {
  GET: (_, res) => res.render("signup"),
  POST: (req, res) => {
    Signup.create(req.body)
    res.redirect("/");
  }
}