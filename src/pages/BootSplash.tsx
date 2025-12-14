import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BootSplash: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const handleTransition = () => {
    // Trigger flash
    setShowFlash(true);

    // Wait for flash peak (approx 100ms-300ms) then navigate
    setTimeout(() => {
      const savedTheme = localStorage.getItem('forge.theme');
      if (savedTheme) {
        navigate('/home', { replace: true });
      } else {
        navigate('/theme', { replace: true });
      }
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // If video hasn't ended by 6.5s, force transition (fallback)
      // or show fallback button if video failed to load completely
      if (videoRef.current && videoRef.current.paused && videoRef.current.currentTime === 0) {
         setShowFallback(true);
      } else {
         handleTransition();
      }
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  const onVideoEnded = () => {
    handleTransition();
  };

  const onVideoError = () => {
    console.warn("Video failed to load, showing fallback.");
    setShowFallback(true);
  };

  return (
    <div className="video-container">
      {!showFallback ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          poster="/intro/forge-hammer-poster.svg"
          onEnded={onVideoEnded}
          onError={onVideoError}
        >
          <source src="/intro/forge-hammer.mp4" type="video/mp4" />
        </video>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#fff' }}>
           <img src="/intro/forge-hammer-poster.svg" alt="Forge" style={{ maxWidth: '80%', borderRadius: 8 }} />
           <button onClick={handleTransition} style={{ marginTop: '1rem' }}>Enter Forge</button>
        </div>
      )}
      
      {showFlash && <div className="flash-overlay" />}
    </div>
  );
};

export default BootSplash;
