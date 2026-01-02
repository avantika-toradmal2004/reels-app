import React, { useState } from "react";
import axios from "axios";
import Reels from "./Reels";
import "./index.css";

function App() {
  const [reels, setReels] = useState([]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ❌ Only audio/video
    if (
      !file.type.startsWith("video/") &&
      !file.type.startsWith("audio/")
    ) {
      alert("Only Audio or Video allowed");
      return;
    }

    try {
      // 1️⃣ Upload file to backend
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 2️⃣ Save reel in MongoDB
      const reelRes = await axios.post(
        "http://localhost:5000/api/reels",
        {
          videoUrl: uploadRes.data.fileUrl,
          type: file.type.startsWith("video/") ? "video" : "audio",
        }
      );

      // 3️⃣ Use MongoDB reel (_id)
      setReels((prev) => [...prev, reelRes.data]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <>
      {/* Upload Button */}
      <div className="upload-box">
        <input
          type="file"
          accept="audio/*,video/*"
          onChange={handleChange}
        />
      </div>

      {/* Reels UI */}
      <Reels reels={reels} />
    </>
  );
}

export default App;
