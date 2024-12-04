import YouTube from "react-youtube";
import "../../../css/user_page/gameView.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const GameView = () => {
  const {id} = useParams()
  const game = useSelector((state)=>state.games.filter((game)=>game.id==id)[0])
  console.log(game);
  
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
            <h1>{game.name}</h1>
        <div className="game-cont">
          <div className="game-vieu">
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
          <strong>Name:</strong> <p>{game.name}</p>
          <strong>theme:</strong> <p>{game.themes}</p>
          <strong>Game description:</strong> <p>{game.summary}</p>
            <strong>Game Category:</strong> <p>{game.category}</p>
            <strong>Game Genres:</strong>
             <ul className="genres-list">
              {game.genres.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
            <strong>Game Theme:</strong>
             <ul className="theme-list">
              {game.themes.map((theme, index) => (
                <li key={index}>{theme}</li>
              ))}
            </ul>
          <strong>Release Date:</strong>  <p>{new Date(game.first_release_date).toLocaleDateString()}</p>
          <strong>Rating:</strong>  <p>{game.rating.toFixed(2)}%</p>
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
