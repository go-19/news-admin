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
      alert("Please confirm your identity to access the admin panel")
    }
  },
  POST: async (req, res) => {

    const admin = Admin.newsMaker(req.body, req.files);

    if (admin) {
      res.redirect("/")
    } else if (logout === '') {
      localStorage.removeItem("admin.json");
    } else {
      console.log('not found');
    }
  }
}