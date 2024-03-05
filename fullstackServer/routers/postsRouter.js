const router = require("express").Router();
const posts = require("../controllers/postsController");

router.get("/", posts.getPosts);
router.post("/", posts.createPosts);

module.exports = router;
