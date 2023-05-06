import React, { useRef, useState } from "react";
import VideoFooter from "./VideoFooter";
import VideoSidebar from "./VideoSidebar";
import "./Video.css";

const Video = ({ url, channel, description, likes, linked, shares, title }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  
  return (
    <div className="video">
      <video
        className="video__player"
        loop
        muted={true}
        onClick={onVideoPress}
        ref={videoRef}
        autoPlay
        src={url}
      ></video>
      <VideoFooter channel={channel} description={description} title={title} />
      <VideoSidebar likes={likes} linked={linked} shares={shares} />
    </div>
  );
}

export default Video;
