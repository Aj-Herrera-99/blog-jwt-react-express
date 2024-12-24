const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verifyToken");
let posts = require("../data/posts");

// index
router.get("/", (req, res) => {
    if (!posts) return res.status(404).json("Not Found");
    res.json(posts);
});

// store
router.post("/", verify, (req, res) => {
    const { userId, content } = req.body;
    if (!content.trim().length) return res.status(400).json("No Content");
    const newPost = {
        id: uuidv4(),
        userId: userId,
        content: content,
        time: new Date().getTime(),
        date: new Date().toDateString(),
    };
    // * simulazione create new post nel db . . .
    posts.push(newPost);
    console.log(posts);
    res.status(201).json(newPost);
});

// put
router.put("/:id/:userId", verify, (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        // * simulazione update post dal db . . .
        const { content } = req.body;
        const updatedPost = posts.find((post) => {
            return post.id == req.params.id && post.userId == req.params.userId;
        });
        updatedPost.content = content;
        posts = posts.filter((post) => post.id != req.params.id);
        posts.push(updatedPost);
        res.sendStatus(204);
    } else {
        res.status(403).json("You are not allowed to update this post!");
    }
});

// destroy
router.delete("/:id/:userId", verify, (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        // * simulazione delete post dal db . . .
        posts = posts.filter((post) => post.id != req.params.id);
        res.status(200).json("User has been deleted");
    } else {
        res.status(403).json("You are not allowed to delete this post!");
    }
});

module.exports = router;
