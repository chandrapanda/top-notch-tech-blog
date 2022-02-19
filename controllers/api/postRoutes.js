const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATE new post
router.post("/", async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      starting_date: req.body.starting_date,
      starting_time: req.body.starting_time,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbPostData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: Get all posts by specific user
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    if (!dbPostData) {
      res.status(400).json({ message: "ERROR - no posts found!" });
      return dbPostData;
    }
    dbPostData.map();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get a single post by its `id`
router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {});
    if (!dbPostData) {
      res.status(404).json({ message: "No post with this ID found" });
      return dbPostData;
    }
    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
