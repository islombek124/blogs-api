const express = require("express");
const app = express();
const { create } = require("express-handlebars");
const session = require("express-session");
const varMiddleware = require("./middleware/var");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const port = process.env.PORT || 3000;

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({ secret: "SECRET_SESSION", resave: false, saveUninitialized: false })
);
app.use(flash());
app.use(varMiddleware);

app.use(blogRoutes);
app.use(authRoutes);

// hbs config
const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

// handlebars settings
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// Routes
app.get("/", async (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

// connect mongoose
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://islom:RDUDJCbcW8MFwRKQ@defaultdb.ljnncq5.mongodb.net/blogs-api"
  )
  .then(() => {
    console.log("connected to mongoose");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("listening on port: " + port);
});
