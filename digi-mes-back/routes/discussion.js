const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussion");

router.post("/", discussionController.createMessage);
router.get("/", discussionController.getMessages);
router.get("/:id", discussionController.getOneMessage);
router.put("/:id", discussionController.modifyMessage);
router.delete("/:id", discussionController.deleteMessage);

module.exports = router;
