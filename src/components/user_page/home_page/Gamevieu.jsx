import React from "react";
import YouTube from "react-youtube";
import "../../../css/user_page/gamevieu.css"

const App = () => {
  
  const videoOptions = {
    playerVars: {
      autoplay: 1, 
      mute: 1,     
      loop: 1,     
      controls: 0, 
      loading : "hello sir  ",
      showinfo: 0, 
      modestbranding: 1,
      playlist: "F63h3v9QV7w"
    }
  };

  return (
    <>
    <div className="container">
      <div className="video-background">
        <YouTube videoId="94B-38sX5fs" opts={videoOptions} className="youtube-iframe" />
      </div>
<div className="bigcount">
      <div className="game-cont">

        <div className="game-vieu">
          <h1>red dead redemeption 2</h1>
              <img src="https://images.igdb.com/igdb/image/upload/t_1080p/x8xczj2a0y6g9rnhboko.jpg" alt="" /> 
          
          <div className="big-screenshot">
              <img src="https://images.igdb.com/igdb/image/upload/t_1080p/tdxv4zzkqyjnm9pmwxw0.jpg" alt="" />
              <img src="https://images.igdb.com/igdb/image/upload/t_1080p/x8xczj2a0y6g9rnhboko.jpg" alt="" />
              <img src="https://images.igdb.com/igdb/image/upload/t_1080p/mptosgjarjlyqxy7lqsm.jpg" alt="" />
              <img src="https://images.igdb.com/igdb/image/upload/t_1080p/c9xalka7stjkx4mes7kp.jpg" alt="" />
              <img src="https://images.igdb.com/igdb/image/upload/t_1080p/banftd8fgfytbsfx6mjz.jpg" alt="" />
              <img src="https://images.igdb.com/igdb/image/upload/t_1080p/banftd8fgfytbsfx6mjz.jpg" alt="" />
              <img src="https://images.igdb.com/igdb/image/upload/t_1080p/x8xczj2a0y6g9rnhboko.jpg" alt="" />
          </div>

        </div>
        
        <div className="game-info">
            hello red dead
        </div>
      </div>
      
      <div className="comments">
        hello
      </div>
      </div>
    </div>
    </>

  );
};

export default App;