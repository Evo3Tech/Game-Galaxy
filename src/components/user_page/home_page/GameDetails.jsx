import React from 'react';

const GameDetailsControl = ({ toggleContentVisibility, isContentHidden }) => {
  return (
    <div className="game-details-controls">
      <button onClick={toggleContentVisibility}>
        {isContentHidden ? "Show Details" : "Hide Details"}
      </button>
      <button>Button 2</button>
      <button>Button 3</button>
    </div>
  );
};

export default GameDetailsControl;
