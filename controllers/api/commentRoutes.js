const router = require("express").Router();
const { Comment } = require("../../models");

//Create new comment
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
