import React from 'react';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { testimonialVideos } from '../../data/videos';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  return (
    <section className="testimonials" data-section-name="testimonials">
      <div className="container">
        <div className="videos">
          {testimonialVideos.map((video) => (
            <div key={video.id} className="video-wrapper">
              <VideoPlayer
                videoId={video.id}
                thumbnailUrl={video.thumbnailUrl}
                title={video.title}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

