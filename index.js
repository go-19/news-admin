const express = require("express");
const ejs = require("ejs");
const fs = require("fs").promises;
const alert = require("alert");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");

const { LocalStorage } = require("node-localstorage");

global.localStorage = new LocalStorage('./scratch');

app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.set("view engine", "html");

app.engine("html", ejs.renderFile)

app.get("/", (_, res) => {

    res.render("index")
})

app.get("/login", async (_, res) => {

    res.render("login")
})

app.get("/signup", async (_, res) => {

    res.render("signup")
})

app.get("/admin", (_, res) => {

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
})

app.post("/admin", async (req, res) => {

    const file = req.files.file;

    if (req.body.title) {

        file.mv(path.join(__dirname, "/images", file.name), (err) => {
            console.log(err);
        })

        res.render("index", {
            title: req.body.title,
            more: req.body.more,
            img: `../images/${req.files.file.name}`
        })

        res.redirect("/")

    } else if (req.body.logout === '') {
        localStorage.removeItem("admin.json");
        res.redirect("/")
    } else {
        console.log('not found');
    }
})

// app.post("/admin", async (req, res) => {


//     res.redirect("/")
// })

app.post("/signup", async (req, res) => {

    const admin = await fs.readFile("./data/data.json", "utf8");
    const parsed = JSON.parse(admin);

    parsed.unshift({
        name: req.body.name,
        userName: req.body.username,
        role: req.body.role,
        password: req.body.password
    })

    res.redirect("/")
    await fs.writeFile("./data/data.json", JSON.stringify(parsed, null, 4));
})

app.post("/login", async (req, res) => {

    const admin = await fs.readFile("./data/data.json", "utf8");
    const parsed = JSON.parse(admin);

    const found = parsed.find(user => user.userName === req.body.username && user.password === req.body.password)

    console.log(req.body.password, req.body.username, found);

    if (found) {

        localStorage.setItem("admin.json", JSON.stringify(found, null, 4));
        res.redirect("/admin");
    } else {
        res.redirect("/login");
    }
})

const PORT = process.env.PORT || 2001;

app.listen(PORT, () => console.log(PORT));