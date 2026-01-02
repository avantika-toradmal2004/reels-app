import React, { useRef, useState, useEffect } from "react";
import { FaHeart, FaRegCommentDots, FaShare } from "react-icons/fa";

function Reels({ reels }) {
  const mediaRefs = useRef([]);
  const containerRef = useRef(null);
  const [likes, setLikes] = useState({});
  const [showHeart, setShowHeart] = useState(null);

  // ❤️ Like
  const handleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // ❤️❤️ Double tap
  const handleDoubleClick = (id) => {
    handleLike(id);
    setShowHeart(id);
    setTimeout(() => setShowHeart(null), 700);
  };

  // ▶ Auto play on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    mediaRefs.current.forEach((media) => {
      if (media && media.tagName === "VIDEO") {
        observer.observe(media);
      }
    });

    return () => observer.disconnect();
  }, [reels]);

  return (
    <div className="reels-container" ref={containerRef}>
      {reels.map((reel, index) => (
        <div
          className="reel"
          key={reel.id}
          onDoubleClick={() => handleDoubleClick(reel.id)}
        >
          {reel.type === "video" ? (
            <video
              ref={(el) => (mediaRefs.current[index] = el)}
              src={reel.src}
              className="reel-media"
              loop
              muted
            />
          ) : (
            <audio
              ref={(el) => (mediaRefs.current[index] = el)}
              src={reel.src}
              controls
              className="audio-player"
            />
          )}

          {/* ❤️ Big Heart Animation */}
          {showHeart === reel.id && (
            <div className="big-heart">❤️</div>
          )}

          {/* Action Icons */}
          <div className="reel-actions">
            <div onClick={() => handleLike(reel.id)}>
              <FaHeart />
              <span>{likes[reel.id] || 0}</span>
            </div>

            <div>
              <FaRegCommentDots />
              <span>0</span>
            </div>

            <div>
              <FaShare />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reels;
