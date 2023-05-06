import React from "react";
import "./VideoFooter.css";

const VideoFooter = ({ channel, title, description }) => {
  return (
    <div className="videoFooter" >
      <div className="videoFooter__text">
        <p id="channel">@{channel}</p>
        <p id="title">{title}</p>
        <p id="description">{description}</p>
      </div>
    </div>
  );
}

export default VideoFooter;
