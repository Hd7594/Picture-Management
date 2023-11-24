const mongoose = require("mongoose");
const Photo = mongoose.model("Photo", {
  name: String,
  description: String,
  author: String,
  picture: Object,
});

module.exports = Photo;
