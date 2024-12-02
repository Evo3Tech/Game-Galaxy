import YouTube from "react-youtube";
import "../../../css/user_page/gamevieu.css";
import { useState } from "react";

const Gamevieu = () => {
  const game =   {

    "id": 25076,
    "age_ratings": [
      26094,
      91819,
      103556,
      190460,
      192335,
      192336,
      192337
    ],
    "category": "main game",
    "cover": "https://images.igdb.com/igdb/image/upload/t_1080p/co1q1f.jpg",
    "created_at": "2016-10-18T13:14:40.000Z",
    "first_release_date": "2018-10-26T00:00:00.000Z",
    "game_modes": [
      "Single player",
      "Multiplayer",
      "Co-operative"
    ],
    "genres": [
      "Shooter",
      "Role-playing (RPG)",
      "Adventure"
    ],
    "involved_companies": [
      190251,
      190252
    ],
    "name": "Red Dead Redemption 2",
    "rating": 92.93805761757541,
    "screenshots": [
      "https://images.igdb.com/igdb/image/upload/t_1080p/xegpfnsvlyeld0zkjnrc.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/c9xalka7stjkx4mes7kp.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/qg7gx276z3hsqlr9xpt6.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/x8xczj2a0y6g9rnhboko.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/dhw6ucx9laj5esv6rngn.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/h8f9uojkzvaau8pxsyxi.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/tdxv4zzkqyjnm9pmwxw0.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/kcfpf8wa8esalk0qkpo5.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/uyaminfh8sugglvt247u.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/banftd8fgfytbsfx6mjz.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/dorsz0jbcecmkxvzi3t8.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/mptosgjarjlyqxy7lqsm.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/sctkgp.jpg",
      "https://images.igdb.com/igdb/image/upload/t_1080p/sctkgq.jpg"
    ],
    "similar_games": [
      1877,
      1905,
      11156,
      17379,
      19164,
      19564,
      19565,
      26192,
      28168,
      36926
    ],
    "slug": "red-dead-redemption-2",
    "storyline": "America, 1899. The end of the wild west era has begun as lawmen hunt down the last remaining outlaw gangs. Those who will not surrender or succumb are killed.\n\nAfter a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.",
    "summary": "Red Dead Redemption 2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age.",
    "themes": [
      "Action",
      "Drama",
      "Open world"
    ],
    "url": "https://www.igdb.com/games/red-dead-redemption-2",
    "videos": [
      "https://www.youtube.com/watch?v=HVRzx17WHVk",
      "https://www.youtube.com/watch?v=Dw_oH5oiUSE",
      "https://www.youtube.com/watch?v=9_GsrTCslQ4",
      "https://www.youtube.com/watch?v=t5AdF4uNGus",
      "https://www.youtube.com/watch?v=94B-38sX5fs",
      "https://www.youtube.com/watch?v=iqaipBpnVRE",
      "https://www.youtube.com/watch?v=SXvQ1nK4oxk"
    ]
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

export default Gamevieu;
