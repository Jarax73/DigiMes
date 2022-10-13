const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
// const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/passport");
const passport = require("passport");

router.get("/", userCtrl.getUsers);
router.post("/register", userCtrl.signup);
router.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    userMiddleware
);
router.post("/login", userCtrl.login);

module.exports = router;
