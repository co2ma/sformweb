import React, { useState } from "react";
import "./VideoSidebar.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ListIcon from '@mui/icons-material/List';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from "react-router-dom";


const VideoSidebar = ({ linked }) => {
  const navigate = useNavigate();

  const handleListIconClick = () => {
    navigate(`/ItemList/${linked}`);
  };

  const handleShareIconClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Shared Title',
        text: 'Shared Text',
        url: `/ItemList/${linked}`,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      alert(`Share this page: ${window.location.href}`);
    }
  };

  return (
    <div className="videoSidebar">
      <div className="videoSidebar__button">
        <ListIcon fontSize="large" onClick={handleListIconClick} />
      </div>
      <div className="videoSidebar__button">
        <ShareIcon fontSize="large" onClick={handleShareIconClick} />
      </div>
    </div>
  );
}

export default VideoSidebar;
