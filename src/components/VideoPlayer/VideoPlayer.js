import React, { useState } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoId, thumbnailUrl, title = "Youtube Video" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <article className="video" role="presentation">
      {!isPlaying && (
        <>
          <img
            decoding="async"
            loading="lazy"
            src={thumbnailUrl}
            alt={title}
            className="thumbnail"
            fetchpriority="low"
          />
          <button
            aria-label="Play"
            className="play-btn"
            onClick={handlePlay}
          >
            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
              <path
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#212121"
                fillOpacity="0.8"
                style={{
                  transition: 'fill .1s cubic-bezier(0.4, 0, 1, 1), fill-opacity .1s cubic-bezier(0.4, 0, 1, 1)'
                }}
              />
              <path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
          </button>
        </>
      )}
      {isPlaying && (
        <iframe
          loading="lazy"
          className="iframe"
          title={title}
          allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
        />
      )}
    </article>
  );
};

export default VideoPlayer;

