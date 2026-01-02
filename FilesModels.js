const mongoose = require("mongoose");

const FilesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["image", "video", "audio"],
  },
  filename: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
  },
  size: {
    type: Number,
  },
  mimeType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Media", FilesSchema);
