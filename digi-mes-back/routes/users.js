const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
// const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/passport");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

router.post("/auth/register", userCtrl.signup);
router.post("/auth/login", userCtrl.login);
router.delete("/:id", userCtrl.deleteUser);
router.get("/users", auth, userCtrl.getUsers);
router.get("/auth", auth, userMiddleware);

module.exports = router;
