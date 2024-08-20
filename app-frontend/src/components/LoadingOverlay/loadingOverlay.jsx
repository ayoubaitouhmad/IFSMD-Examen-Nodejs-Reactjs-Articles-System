import React from 'react';
import './loadingOverlay.css'; // We'll create this CSS file next

const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingOverlay;
