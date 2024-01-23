import React from "react";

export function Video() {
  return (
    <div className="video_frame">
      <video className="video" loop autoPlay muted data-video-media>
        <source src="/video/video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
