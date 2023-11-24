require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const photoRoutes = require("./routes/photo");
app.use(photoRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running on port 3000");
});
