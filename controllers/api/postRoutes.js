const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Create new post
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    // TODO: Pull user_id based on session and add to body//
    const newPost = await Post.create(body);
    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }

  // req.session.save(() => {
  //   req.session.loggedIn = true;
  // });
});

// Get all posts by specific user
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!dbPostData) {
      res.status(400).json({ message: "ERROR - no posts found!" });
      return dbPostData;
    }

    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
    res.render({
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    res.redirect("login");
  }
});

// router.get("/new", withAuth, (req, res) => {
//   res.render("new-post", {
//     layout: "dashboard",
//   });
// });

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
