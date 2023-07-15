const { Router } = require("express");
const User = require("../modules/UserSchema");
const bcrypt = require("bcrypt");
const generateJWToken = require("../services/token");

const router = Router();

router.get("/login", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
  }
  res.render("login", {
    title: "Login",
    loginError: req.flash("loginError"),
  });
});

router.get("/signup", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
  }
  res.render("signup", {
    title: "Signup",
    signupError: req.flash("signupError"),
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("loginError", "All fields are required");
    res.redirect("/login");
    return;
  }

  const existUser = await User.findOne({ email: email });

  if (!existUser) {
    req.flash("loginError", "User not found");
    res.redirect("/login");
    return;
  }

  const validPassword = await bcrypt.compare(password, existUser.password);

  if (!validPassword) {
    req.flash("loginError", "Password wrong");
    res.redirect("/login");
    return;
  }

  const token = generateJWToken(existUser._id);
  res.cookie("token", token);
  res.redirect("/");
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    req.flash("signupError", "All fields are required");
    res.redirect("/signup");
    return;
  }

  const candidate = await User.findOne({ email });

  if (candidate) {
    req.flash("signupError", "User already exists");
    res.redirect("/signup");
    return;
  }

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: await bcrypt.hash(password, 10),
  });
  const token = generateJWToken(user._id);
  res.cookie("token", token);
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
