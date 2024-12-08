import YouTube from "react-youtube";
import "../../../css/user_page/gameView.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const GameView = () => {
  const {id} = useParams()
  const game = useSelector((state)=>state.games.filter((game)=>game.id==id)[0])
 
 

  if(!game){
    return
  }
  const videoIds = game.videos.map((url) => url.split("v=")[1]);
  const [current_vid,setcurrent_vid] = useState(videoIds[0])

  const videoOptions = {
    playerVars: {
      autoplay: 1, 
      mute: 1,     
      loop: 1,     
      controls: 0, 
      loading: "hello sir",
      showinfo: 0, 
      modestbranding: 1,
      playlist: videoIds.join(",") 
    }
  };
  const [mainScreenshot, setMainScreenshot] = useState(game.screenshots[0]);

  return (
    <div className="container">
      <div className="video-background">
        
          <YouTube 
            videoId={current_vid} 
            opts={videoOptions}
            className="youtube-iframe" 
          />
      
      </div>

      <div className="bigcount">
        <div className="game-cont">
          <div className="game-vieu">
            <h1>{game.name}</h1>
            {/* <button id="" onClick={()=>{setcurrent_vid(videoIds[3])}}>1</button> */}

                    {/* Main Image */}
                    <img src={mainScreenshot} alt={game.name} />

                    {/* Screenshots */}
                    <div className="big-screenshot">
                      {game.screenshots.map((screenshot, index) => (
                            <img
                              key={index}
                              src={screenshot}
                              alt={`Screenshot ${index + 1}`}
                              onClick={() => setMainScreenshot(screenshot)}
                              className="thumbnail"
                            />

                      ))}
                    </div>
          </div>

          <div className="game-info">
          <p><strong>Name:</strong> {game.name}</p>
          <p><strong>theme:</strong> {game.themes}</p>
            <p><strong>Game description:</strong> {game.summary}</p>
            <p><strong>Game Category:</strong> {game.category}</p>
            <p><strong>Release Date:</strong> {new Date(game.first_release_date).toLocaleDateString()}</p>
            <p><strong>Rating:</strong> {game.rating.toFixed(2)}%</p>
            </div>
        </div>

        <div className="comments">
          <p>
              Here where the comment section start gentelmens !
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default GameView;
