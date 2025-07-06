const express = require("express");
// const { createCommunityPost, getAllCommunityPosts, getCommunityPost, addReplyToCommunityPost } = require("../controllers/communityController");
const router = express.Router();
// const authenticate = require("../middlewares/authenticate");
const { fetchAllStudents, createNewStudent, createNewAdmin, login } = require("../controllers/adminController");

router.get("/students", fetchAllStudents);

router.post("/signup", createNewAdmin);

router.post("/login", login);

router.post("/create/student", createNewStudent);

// router.get("/post/:communityPostSlug", getCommunityPost);

// router.post("/:communityPostId/addreply",authenticate, addReplyToCommunityPost);

module.exports = router;