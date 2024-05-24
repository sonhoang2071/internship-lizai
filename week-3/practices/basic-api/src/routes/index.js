const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.get("/posts", postController.getPosts);
router.post("/posts", postController.createPost);
router.get("/posts/:id", postController.getPost);
router.put("/posts/:id", postController.updatePost);
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
