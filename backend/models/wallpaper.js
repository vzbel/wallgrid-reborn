require("../dotenv.js");

const mongoose = require("mongoose");
const dbUrl = process.env.MONGODB_URI;

// connect to mongodb
mongoose.connect(dbUrl, { family: 4 }).catch((err) => {
  console.error(err);
});

// create schema and model
const wallpaperSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
});
const Wallpaper = mongoose.model("Wallpaper", wallpaperSchema);

// custom toJSON, removes version num. and obj. id
wallpaperSchema.set("toJSON", {
  transform: ({ _doc }) => {
    _doc.id = _doc._id.toString();
    delete _doc._id;
    delete _doc.__v;
    return _doc;
  },
});

module.exports = Wallpaper;
