const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussion");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

router.post("/", auth, discussionController.createMessage);
router.get("/", auth, discussionController.getMessages);
router.get("/:id", auth, discussionController.getOneMessage);
router.put("/:id", auth, discussionController.modifyMessage);
router.delete("/:id", auth, discussionController.deleteMessage);

module.exports = router;
