const express = require("express");
const router = express.Router();
const upload = require("../middleWare/upload");
const controller = require("../controllers/fileController");

router.post("/upload", upload.single("file"), controller.addFile);
router.get("/", controller.getFiles);
router.get("/:id", controller.getFileById);
router.delete("/:id", controller.deleteFile);

module.exports = router;
