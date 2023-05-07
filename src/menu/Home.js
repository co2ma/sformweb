import React, { useState, useEffect } from "react";
import Video from "./video/Video";
import { firestore } from "../firebase";
import "./Home.css";
import { collection, onSnapshot, query } from "firebase/firestore";


const Home = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const videosCollection = collection(firestore, "projects");
    const q = query(videosCollection);
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .filter((doc) => doc.data().isTempSave !== false)
        .map((doc) => doc.data());
      setVideos(data);
    }); 

    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <div className="app__videos">
        {videos.map(
          ({ videoSrc, createdBy, summary, linked, title }) => (
            <Video
              url={videoSrc}
              channel={createdBy}
              linked={linked}
              description={summary}
              title={title}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Home;
