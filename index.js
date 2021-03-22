const express = require("express");
const ejs = require("ejs");
const app = express();
const fileUpload = require("express-fileupload");
const routes = require("./src/routes");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.set("view engine", "html");

app.set("views", "src/views");

app.engine("html", ejs.renderFile);

app.use("/assets", express.static("static"));

app.use( "/images", express.static("images") );

app.use(routes);

const PORT = process.env.PORT || 2001;

app.listen(PORT, () => console.log(PORT));
