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

// create
router.post("/", (req, res) => {
    const { userId, content } = req.body;
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

// destroy
router.delete("/:id/:userId", verify, (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        // * simulazione delete post dal db . . .
        posts = posts.filter((post) => post.id != req.params.id);
        res.status(200).json("User has been deleted");
    } else {
        res.status(403).json("You are not allowed to delete this user!");
    }
});

module.exports = router;
