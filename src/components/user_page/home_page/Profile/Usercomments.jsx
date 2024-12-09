import "./small.css";

export default function UserComments() {
  // Array of user comments
  const userComments = [
    {
      id: 1,
      gameTitle: "Cyber Adventure",
      thumbnail: "cyber-adventure.jpg",
      comment: "Amazing gameplay, loved the futuristic vibe!",
      date: "Dec 7, 2024",
    },
    {
      id: 2,
      gameTitle: "Pixel Warrior",
      thumbnail: "pixel-warrior.jpg",
      comment: "Challenging yet rewarding levels.",
      date: "Nov 29, 2024",
    },
    {
      id: 3,
      gameTitle: "Space Explorer",
      thumbnail: "space-explorer.jpg",
      comment: "Stunning visuals and immersive sound design.",
      date: "Oct 15, 2024",
    },
    {
      id: 4,
      gameTitle: "Fantasy Quest",
      thumbnail: "fantasy-quest.jpg",
      comment: "Loved the character customization options!",
      date: "Sep 3, 2024",
    },
    {
      id: 5,
      gameTitle: "Battle Realm",
      thumbnail: "battle-realm.jpg",
      comment: "Action-packed gameplay with fantastic graphics!",
      date: "Aug 22, 2024",
    },
  ];

  return (
    <div className="comments-section">
      <h1>Comments Section</h1>
      <hr />
      {userComments.map((comment) => (
        <div  className="comment-card">
          <img
            src={comment.thumbnail}
            alt={`Thumbnail for ${comment.gameTitle}`}
            className="game-thumbnail"
          />
          <div className="comment-details">
            <h3 className="game-title">{comment.gameTitle}</h3>
            <p className="comment-text">"{comment.comment}"</p>
          </div>
        </div>
      ))}
    </div>
  );
}
