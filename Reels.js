const mongoose = require("mongoose");
import axios from "axios";

const handleLike = async (id) => {
  await axios.post(`http://localhost:5000/api/reels/${id}/like`);
};


const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const reelSchema = new mongoose.Schema({
  videoUrl: String,
  likes: { type: Number, default: 0 },
  comments: [commentSchema],
});

module.exports = mongoose.model("Reel", reelSchema);
