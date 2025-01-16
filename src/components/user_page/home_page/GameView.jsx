import YouTube from "react-youtube";
import "../../../css/user_page/gameView.css";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Comments from "../comments/Comments.jsx";
import GameDetails from "./GameDetails.jsx";

const GameView = () => {

  const { id } = useParams();
  const game = useSelector((state) => state.games.filter((game) => game.id == id)[0]);

  if (!game) {
    return
  }

  const videoIds = game.videos.map((url) => {
    const match = url.match(/v=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }).filter(Boolean);

  const [current_vid, setcurrent_vid] = useState(videoIds[0]);
  const [isContentHidden, setIsContentHidden] = useState(false);
  const playerRef = useRef({});
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);


  const showvid = () => {
    setIsContentHidden((prevState) => !prevState);
  };

  const Play_Pause = () => {
    if (playerRef.current) {
      if (isPaused) {
        playerRef.current.internalPlayer.playVideo();
      } else {
        playerRef.current.internalPlayer.pauseVideo();
      }
      setIsPaused((prev) => !prev);
    }
  };


  const nextVideo = () => {
    const currentIndex = videoIds.indexOf(current_vid);
    const nextIndex = (currentIndex + 1) % videoIds.length; 
    setcurrent_vid(videoIds[nextIndex]);
  };

  const prevVideo = () => {
    const currentIndex = videoIds.indexOf(current_vid);
    const prevIndex = (currentIndex - 1 + videoIds.length) % videoIds.length; 
    setcurrent_vid(videoIds[prevIndex]);
  };

  const toggleSound = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.internalPlayer.unMute();
      } else {
        playerRef.current.internalPlayer.mute();
      }
      setIsMuted((prev) => !prev); 
    }
  };

  const videoOptions = {
    playerVars: {
      autoplay: 1,
      mute: isMuted ? 1 : 0, 
      loop: 1,
      controls: 0,
      loading: "hello sir",
      showinfo: 0,
      modestbranding: 1,
      playlist: videoIds.join(","),
    },
  };

  const [mainScreenshot, setMainScreenshot] = useState(game.screenshots[0]);

  return (
    <div className="container">
      <GameDetails
        showvid={showvid}
        isContentHidden={isContentHidden}
        pauseVideo={Play_Pause}
        nextVideo={nextVideo}
        prevVideo={prevVideo}
        toggleSound={toggleSound} 
      />

      <div className="video-background">
        <YouTube
          videoId={current_vid}
          opts={videoOptions}
          className="youtube-iframe"
          ref={playerRef}
        />
      </div>

      <div className={`bigcount ${isContentHidden ? "hidden" : ""}`}>
        <h1 className="game_title">
          {game.name}
        </h1>
        <div className="game-cont">
          <div className="game-vieu">
            {/* Main Image */}
            <img className="main_screenshot" src={mainScreenshot} alt={game.name} />

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
            <strong>Release Date:</strong>{" "}
            <p>{new Date(game.first_release_date).toLocaleDateString()}</p>
            <strong>Rating:</strong> <p>{game.rating != null ? game.rating.toFixed(2)+'%' : 'Not released'}</p>
          </div>
        </div>

        <Comments game_id={game.id}/>
      </div>
    </div>
  );
};

export default GameView;
