import React from 'react';
import '../../styles/components/layout/Loading.css';

const Loading = () => {
  return (
    <div className="loading-screen-overlay">
      <div className="loading-container">
        <div className="loading-circle"></div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;