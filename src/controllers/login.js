const express = require("express");
const app = express();

const { LocalStorage } = require("node-localstorage");
global.localStorage = new LocalStorage('./scratch');

app.set("view engine", "html");

app.set("/views", "src/views");

const User = require("../models/login");

module.exports = {
  GET: (_, res) => res.render("login"),
  POST: async (req, res) => {

    const user = await User.checkUser(req.body);

    if (user) {

      localStorage.setItem("admin.json", await JSON.stringify(user, null, 4));
      res.redirect("/admin");
    } else {
      res.redirect("/login");
    }
  }
}