const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
// const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/passport");
const passport = require("passport");

router.post("/register", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", userCtrl.deleteUser);
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    userMiddleware
);

module.exports = router;
