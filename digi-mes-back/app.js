/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const passport = require("passport");
dotenv.config();
// const User = require("./models/users");
const userRoutes = require("./routes/users");
const discussionsRoutes = require("./routes/discussion");

app.use(express.json());
app.use(passport.initialize());

require("./controllers/passport");

mongoose
    .connect(`${process.env.MONGO_CONNECT}`)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use("/api/auth", userRoutes);
app.use("/api/discussions", discussionsRoutes);

module.exports = app;
