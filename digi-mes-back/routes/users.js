const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
// const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/passport");
const passport = require("passport");

router.post("/register", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.getUsers);
router.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    userMiddleware
);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
