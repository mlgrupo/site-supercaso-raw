import React from 'react';
import './NoticeBanner.css';

const NoticeBanner = ({ message, children }) => {
  const content = message || children;
  if (!content) return null;

  return (
    <div className="notice">
      <div className="container">
        <div className="text">{content}</div>
      </div>
    </div>
  );
};

export default NoticeBanner;

