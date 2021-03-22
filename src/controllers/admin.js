const { LocalStorage } = require("node-localstorage");
global.localStorage = new LocalStorage('./scratch');

const Admin = require("../models/admin");

module.exports = {
  GET: (_, res) => {
    const data = localStorage.getItem("admin.json");
    const parsed = JSON.parse(data);

    if (parsed) {
      res.render("admin", {
        users: parsed
      });
    } else {
      res.redirect("/login");
    }
  },
  POST: async (req, res) => {


    if (req.body.title) {
      Admin.newsMaker(req.body, req.files);
      res.redirect("/");
    } else if (req.body.logout === '') {
      localStorage.removeItem("admin.json");
      res.redirect("/")
    } else {
      console.log('not found');
    }
  }
}