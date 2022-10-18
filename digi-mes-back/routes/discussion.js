const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussion");
const passport = require("passport");

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    discussionController.createMessage
);
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    discussionController.getMessages
);
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    discussionController.getOneMessage
);
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    discussionController.modifyMessage
);
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    discussionController.deleteMessage
);

module.exports = router;
