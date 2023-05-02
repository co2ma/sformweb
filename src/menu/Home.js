import React, { useState, useEffect } from "react";
import Video from "./Video";
import { db } from "../firebase";
import "./Home.css";
import { collection, onSnapshot, query, doc, data } from "firebase/firestore";


const Test = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const videosCollection = collection(db, "videos");
    const q = query(videosCollection);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <div className="app__videos">
        {videos.map(
          ({ url, channel, description, likes, linked, shares, title }) => (
            <Video
              url={url}
              channel={channel}
              likes={likes}
              linked={linked}
              description={description}
              shares={shares}
              title={title}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Test;
