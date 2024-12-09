import "./small.css";

export default function CommentsLiked() {
  const likedComments = [
    {
      game: "Cyber Adventure",
      thumbnail: "cyber-adventure.jpg",
      text: "Amazing gameplay, loved the futuristic vibe!",
    },
    {
      game: "Pixel Warrior",
      thumbnail: "pixel-warrior.jpg",
      text: "Challenging yet rewarding levels.",
    },
    {
      game: "Space Explorer",
      thumbnail: "space-explorer.jpg",
      text: "Stunning visuals and immersive sound design.",
    },
    {
      game: "Fantasy Quest",
      thumbnail: "fantasy-quest.jpg",
      text: "Loved the character customization options!",
    },
    {
      game: "Fantasy Quest",
      thumbnail: "fantasy-quest.jpg",
      text: "Loved the character customization options!",
    },    {
      game: "Fantasy Quest",
      thumbnail: "fantasy-quest.jpg",
      text: "Loved the character customization options!",
    },
  ];

  return (
    <div className="comments-section">
      <h1>Liked Comments</h1>
      <hr />
      {likedComments.map((comment, index) => (
        <div key={index} className="comment-card">
          <img
            src={comment.thumbnail}
            alt={`Thumbnail for ${comment.game}`}
            className="game-thumbnail"
          />
          <div className="comment-details">
            <h3 className="game-title">{comment.game}</h3>
            <p className="comment-text">"{comment.text}"</p>
          </div>
        </div>
      ))}
    </div>
  );
}
