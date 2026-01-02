const express = require("express");
const Reel = require("../models/Reels");

const router = express.Router();

/* Create Reel */
router.post("/", async (req, res) => {
  const reel = await Reel.create(req.body);
  res.json(reel);
});

/* Like Reel */
router.post("/:id/like", async (req, res) => {
  const reel = await Reel.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.json(reel);
});

/* Add Comment */
router.post("/:id/comment", async (req, res) => {
  const reel = await Reel.findById(req.params.id);
  reel.comments.push({ text: req.body.text });
  await reel.save();
  res.json(reel);
});
// CREATE reel
router.post("/", async (req, res) => {
  const reel = await Reel.create({
    videoUrl: req.body.videoUrl,
  });
  res.json(reel);
});


/* Get All Reels */
router.get("/", async (req, res) => {
  const reels = await Reel.find();
  res.json(reels);
});

module.exports = router;
