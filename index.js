const express = require("express");
const ejs = require("ejs");
const fs = require("fs").promises;
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

app.get("/admin", async (req, res) => {

    const data = await fs.readFile("./scratch/admin.txt", "utf8");
    const parsed = JSON.parse(data);

    if (parsed) {
        res.render("admin", {
            user: parsed,
        });
    } else {
        res.render("/");
    }

    console.log(req);
})

app.post("/admin", async (req, res) => {

    console.log(req.body.name);

    // const data = await fs.readFile("./scratch/admin.txt", "utf8");
    // const parsed = JSON.parse(data);

    // localStorage.clear("./scratch/admin.txt");
})

app.post("/login", async (req, res) => {

    const admin = await fs.readFile("./data/data.json", "utf8");
    const parsed = JSON.parse(admin);

    const found = parsed.find(user => user.userName === req.body.username && user.password === req.body.password);

    if (found) {

        localStorage.setItem("admin.txt", JSON.stringify(found));
        res.redirect("/admin");

    } else {
        res.redirect("/login");
    }
})


const PORT = process.env.PORT || 2001;

app.listen(PORT, () => console.log(PORT));