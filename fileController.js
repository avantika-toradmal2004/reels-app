const Media = require("../models/FilesModels");

// ✅ Upload / Add file metadata
exports.addFile = async (req, res) => {
  try {
    // Multer ने file पाठवली नसेल तर
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title, type } = req.body;

    const file = new Media({
      title,
      type,
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
    });

    const saved = await file.save();

    res.status(201).json(saved);

  } catch (error) {
    console.error("Add File Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get all files
exports.getFiles = async (req, res) => {
  try {
    const files = await Media.find().sort({ createdAt: -1 });
    res.status(200).json(files);

  } catch (error) {
    console.error("Get Files Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get single file by ID
exports.getFileById = async (req, res) => {
  try {
    const file = await Media.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(file);

  } catch (error) {
    console.error("Get File Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete file by ID
exports.deleteFile = async (req, res) => {
  try {
    const deleted = await Media.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ message: "File deleted successfully" });

  } catch (error) {
    console.error("Delete File Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
