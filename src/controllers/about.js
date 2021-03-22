const ejs = require("ejs");
const express = require("express");
const app = express();

app.set("view engine", "html");

app.engine("html", ejs.renderFile);

module.exports = { GET: (_, res) => res.render("about") }