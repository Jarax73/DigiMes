/* eslint-disable no-undef */
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
// const User = require("./models/users");
const userRoutes = require("./routes/users");
console.log(process.env.MONGO_CONNECT);

app.use(express.json());
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

module.exports = app;
