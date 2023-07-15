const { Router } = require("express");
const router = Router();
const Blog = require("../modules/BlogSchema");

router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

router.get("/blog", (req, res) => {
  if (!req.cookies.token || !res.locals.isUserAdmin) {
    res.redirect("/");
  }
  res.render("blog", {
    title: "Save a Blog",
    isBlog: true,
    blogError: req.flash("blogError"),
  });
});

router.get("/delete-blog", (req, res) => {
  if (!req.cookies.token || !res.locals.isUserAdmin) {
    res.redirect("/");
  }
  res.render("delete-blog", {
    title: "Delete a Blog",
    isDeleteBlog: true,
    deleteError: req.flash("deleteError"),
  });
});

router.post("/blog", async (req, res) => {
  if (!req.cookies.token || !res.locals.isUserAdmin) {
    res.redirect("/");
  }
  const { image, title, description, fullDescription, author } = req.body;

  if (!title || !description || !fullDescription || !author) {
    req.flash("blogError", "All fields are required");
    res.redirect("/blog");
    return;
  }

  const newBlog = Blog.create({
    image: image,
    title: title,
    description: description,
    fullDescription: fullDescription,
    author: author,
  });
  res.status(200).redirect("/blog");
});

router.get("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.put("/blogs/:id", async (req, res) => {
//   if (!req.cookies.token || !res.locals.isUserAdmin) {
//     res.redirect("/");
//   }
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findByIdAndUpdate(id, req.body);
//     if (!blog) {
//       return res
//         .status(404)
//         .json({ message: `Cannot find any blog with ID ${id}` });
//     }
//     const updatedUser = await User.findById(id);
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// });

router.post("/delete-blog", async (req, res) => {
  if (!req.cookies.token || !res.locals.isUserAdmin) {
    res.redirect("/");
  }
  const { id } = req.body;
  if (!id) {
    req.flash("deleteError", "ID is wrong!");
    res.redirect("/delete-blog");
    return;
  }
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    req.flash("deleteError", `Can't find blog with ID ${id}`);
    res.redirect("/delete-blog");
    return;
  }

  res.status(200).redirect("/delete-blog");
});

module.exports = router;
