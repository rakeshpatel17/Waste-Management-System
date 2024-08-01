import React, { useState, useEffect } from 'react';
import play from "../images/play.png";
import pause from "../images/pause.png";
import rewind from "../images/rewind.png";
import forward from "../images/forward.png";

export default function Song() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(180);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev < duration ? prev + 1 : duration));
      }, 1000); 
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    setProgress(prev => Math.max(prev - 10, 0)); 
  };

  const handleForward = () => {
    setProgress(prev => Math.min(prev + 10, duration)); 
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center p-5' style={{ gap: "20px" }}>
      <div className='container d-flex flex-column justify-content-center align-items-center my-5' style={{ gap: "20px" }}>
        <div className='container'>
          <center>
            <img src='https://wallpapers.com/images/hd/aesthetic-purple-musical-notes-lzk1lrr7gxowla0q.jpg' alt='album' width={"20%"} height={"30%"} />
          </center>
        </div>
        <div className='container'>
          <p className='text-center'>Song Name</p>
          <p className='text-center'>Singer Name</p>
        </div>
      </div>
      <div className="container d-flex flex-column align-items-center" style={{ gap: "20px" }}>
        <div className="container d-flex justify-content-center align-items-center" style={{ gap: "10px", width: "40%" }}>
          <span>{formatTime(progress)}</span>
          <div className="progress-bar-container" style={{ flex: 1, position: "relative", height: "10px", borderRadius: "5px", background: "#ddd" }}>
            <div className="progress-bar" style={{ position: "absolute",  height: "100%", width: `${(progress / duration) * 100}%`, background: "#E3A5C7", borderRadius: "5px" }}></div>
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              style={{
                width: "100%",
                position: "absolute",
                height: "100%",
                opacity: 0,
                cursor: "pointer"
              }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="container d-flex justify-content-center align-items-center" style={{ gap: "20px" }}>
          <button className='btn' style={{ background: "none" }} onClick={handleRewind}>
            <img src={rewind} alt='rewind' width={"30px"} />
          </button>
          <button className='btn' style={{ background: "none" }} onClick={handlePlayPause}>
            <img src={isPlaying ? pause : play} alt='play/pause' width={"30px"} height={"40px"} />
          </button>
          <button className='btn' style={{ background: "none" }} onClick={handleForward}>
            <img src={forward} alt='forward' width={"30px"} />
          </button>
        </div>
      </div>
    </div>
  );
}
