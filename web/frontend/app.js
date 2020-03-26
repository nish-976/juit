const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
    res.render("signup.ejs");
});
app.get("/signin", (req, res, next) => {
    res.render("signin.ejs");
});
app.get("/signup", (req, res, next) => {
    res.render("signup.ejs");
});

const port = 3000;

app.listen(port);