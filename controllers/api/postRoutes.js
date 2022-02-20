const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATE new post
router.post("/", async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      date: req.body.date,
      time: req.body.time,
      user: req.body.username,
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

// Get all posts by specific user
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

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("all-posts-admin", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

// router.get('/edit/:id', withAuth, async (req, res) => {
//   try {
//     const dbPostData = await Post.findByPk(req.params.id);

//     if (dbPostData) {
//       const post = dbPostData.get({ plain: true });

//       res.render('edit-post', {
//         layout: 'dashboard',
//         post,
//       });
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.redirect('login');
//   }
// });

module.exports = router;
