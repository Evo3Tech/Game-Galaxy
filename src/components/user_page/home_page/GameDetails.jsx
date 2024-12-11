  import React from 'react';
  import "../../../css/user_page/gameView.css";

  const GameDetails = ({ showvid, isContentHidden ,pauseVideo ,nextVideo , prevVideo , toggleSound}) => {
    return (
      <div className="game-details">
        <button onClick={showvid}>
          {isContentHidden ? "Show" : "Hide"}
        </button>
        <button onClick={pauseVideo}>Pause
        </button>

        <button onClick={nextVideo}>Next</button>
        <button onClick={prevVideo}>Prev</button>
        <button onClick={toggleSound}>Sound</button>

      </div>
    );
  };

  export default GameDetails;
