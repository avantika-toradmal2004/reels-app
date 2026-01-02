import React, { useState } from "react";

const MediaUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (
      selectedFile.type.startsWith("video/") ||
      selectedFile.type.startsWith("audio/")
    ) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Only Audio or Video files allowed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Audio / Video</h2>

      <input
        type="file"
        accept="audio/*,video/*"
        onChange={handleChange}
      />

      {file && (
        <div style={{ marginTop: "20px" }}>
          {file.type.startsWith("video/") ? (
            <video src={preview} controls width="300" />
          ) : (
            <audio src={preview} controls />
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};

export default MediaUpload;
