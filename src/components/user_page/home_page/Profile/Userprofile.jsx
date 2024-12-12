import { Outlet, useNavigate } from "react-router-dom";
import "../../../../css/user_page/profile.css";
import NavProfile from "./NavProfile";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Userprofile() {
  const user = useSelector((state) => state.user.info);
  if (user == null) return ;
  const userID = user.id
  
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:1231/comments")
      .then((data) => data.json())
      .then((res) => {
        setComments(res);
      });
  }, []);

  useEffect(() => {
    if (userID && comments.length > 0) {
      const userComments = comments.filter((comment) => comment.user_id === userID);
      setCommentsCount(userComments.length); 
    }
  }, [userID, comments]);



  return (
    <div className="User-container">
      <div className="userinfo">
        <NavProfile />
        <Outlet />
      </div>

      <div className="userprofile">
        <img src="https://img.freepik.com/free-vector/smiling-redhaired-cartoon-boy_1308-174709.jpg?ga=GA1.1.623103400.1724355047&semt=ais_hybrid" alt="" />
        <h3>{user.name}</h3>
        <p className="position">Part Of Game Galaxy</p>

        <div className="profile-stats">
          <div>
            <h4>{user.friends.length}</h4>
            <p>Friends</p>
          </div>
          <div>
            <h4>{user.favorites.length}</h4>
            <p>Favorite Games</p>
          </div>
          <div>
            <h4>{commentsCount}</h4>
            <p>Comments</p>
          </div>
        </div>
        <p className="quote">
        </p>
      </div>
    </div>
  );
}
