const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", BlogSchema, "blogs");

module.exports = Blog;
