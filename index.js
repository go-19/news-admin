const express = require("express");
const ejs = require("ejs");
const fs = require("fs").promises;
const alert = require("alert");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");

const Date = require("./date/date.js");

const { LocalStorage } = require("node-localstorage");

global.localStorage = new LocalStorage('./scratch');

app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.set("view engine", "html");

app.engine("html", ejs.renderFile);

app.use("/assets", express.static("static"));

app.use( "/images", express.static("images") );

app.get("/", async (_, res) => {

    const news = await fs.readFile("./data/newsData.json", "utf8");
    const parsed = JSON.parse(news);

    for (let news of parsed) {
        console.log(news.title);
    }

    res.render("index", {
        data: parsed
    })
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

    if (req.body.title) {

        const news = await fs.readFile("./data/newsData.json", "utf8");
        const parsed = JSON.parse(news);

        const file = req.files.file;

        file.mv(path.join(__dirname, "/images", file.name), (err) => {
            console.log(err);
        })

        const data = {
            id: parsed.length + 1,
            title: req.body.title,
            more: req.body.more,
            img: file.name,
            date: [Date.month, Date.monthDay, Date.year, Date.startTime()]
        }

        parsed.unshift(data);

        await fs.writeFile("./data/newsData.json", JSON.stringify(parsed, null, 4));

        res.redirect("/")

    } else if (req.body.logout === '') {
        localStorage.removeItem("admin.json");
        res.redirect("/")
    } else {
        console.log('not found');
    }
})

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

    if (found) {

        localStorage.setItem("admin.json", JSON.stringify(found, null, 4));
        res.redirect("/admin");
    } else {
        res.redirect("/login");
    }
})

const PORT = process.env.PORT || 2001;

app.listen(PORT, () => console.log(PORT));