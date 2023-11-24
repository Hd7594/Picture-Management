const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUpload = require("express-fileupload");

const convertToBase64 = require("../utils/convertToBase64");

const Photo = require("../model/Photo");

router.post("/pictures/create", fileUpload(), async (req, res) => {
  try {
    const picture = req.files.picture;
    const fullPicture = await cloudinary.uploader.upload(
      convertToBase64(picture)
    );

    const { name, description, author } = req.body;

    const newPhoto = new Photo({
      name: name,
      description: description,
      author: author,
      picture: fullPicture,
    });
    await newPhoto.save();
    res.json(newPhoto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pictures/list", async (req, res) => {
  try {
    const photosList = await Photo.find();
    res.json(photosList);

    /*
    const photosList = await Photo.findById(req.query.id);
    if (req.query.id) {
      res.json(photosList);
    } else {
      res.json({ message: "bad request" });
    }
    */
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/pictures/delete", async (req, res) => {
  try {
    await Photo.findByIdAndDelete(req.body.id);
    if (req.body.id) {
      res.json({ message: "Photo deleted" });
    } else {
      res.json({ message: "denied" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
