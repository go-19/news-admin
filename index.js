const express = require("express");
const ejs = require("ejs");
const fs = require("fs").promises;
const alert = require("alert");
const app = express();

const { LocalStorage } = require("node-localstorage");

global.localStorage = new LocalStorage('./scratch');

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "html");

app.engine("html", ejs.renderFile)

app.get("/", (_, res) => {

    res.render("index")
})

app.get("/login", async (_, res) => {

    res.render("login")
})

app.get("/admin", (_, res) => {

    const data = localStorage.getItem("admin.json");
    const parsed = JSON.parse(data);

    if (parsed) {
        res.render("admin", {
            user: JSON.parse(data),
        });
    } else {
        res.redirect("/login");
        alert("Please confirm your identity to access the admin panel")
    }
})

app.post("/admin", async (req, res) => {

    if (req.body.logout === '') {
        localStorage.removeItem("admin.json");
        res.redirect("/")
        console.log('ok');
    } else {
        console.log('not found');
    }
})

app.post("/login", async (req, res) => {

    const admin = await fs.readFile("./data/data.json", "utf8");
    const parsed = JSON.parse(admin);

    const found = parsed.find(user => user.userName === req.body.username && user.password === req.body.password);

    if (found) {

        localStorage.setItem("admin.json", JSON.stringify(found, null, 4));
        res.redirect("/admin");

    } else {
        res.redirect("/login");
    }
})


const PORT = process.env.PORT || 2001;

app.listen(PORT, () => console.log(PORT));