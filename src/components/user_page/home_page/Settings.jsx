import React, { useState, useEffect } from "react";
import "../../../css/user_page/profile.css";
import { changeAvatar } from '../../../redux_store/user/userSlice'

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { modifier } from '../../../redux_store/user/userSlice';

export default function Settings() {
  const user = useSelector((state) => state.user.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gamingPlatform, setGamingPlatform] = useState(user.gamingPlatform);
  const [gamerTag, setGamerTag] = useState(user.gamerTag);
  const [playstyle, setPlaystyle] = useState(user.playstyle);
  const [streamingLink, setStreamingLink] = useState(user.streamingLink);
  const [aboutMe, setAboutMe] = useState(user.aboutMe );

  function handleUpdate(e) {
    e.preventDefault();
  
    const updatedUser = {
      gamingPlatform,
      gamerTag,
      playstyle,
      streamingLink,
      aboutMe,
    };
  
    dispatch(modifier(updatedUser));
  
    fetch("http://localhost:1231/update_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id, 
        updated_data: updatedUser, 
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User updated successfully:", data);
        navigate("/user_interface");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  }
  async function handleImageClick(src){
    let info = {
      userid : user.id,
      srcimg : src
    }
    try {
      const response = await fetch("http://localhost:1231/changeAvatar", {
          method: "POST",
          headers: {
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify(info)
      })
      if(response.ok){
        dispatch(changeAvatar(src))
      }
    } 
    catch (error) {
        console.log(error);
    }

  return (
    <div className="User-container">
      <div className="settings">
        <h3>My Account</h3>
        <p>User Information</p>
        <div className="info-inputs">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={user.name} readOnly />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="text" id="email" value={user.email} readOnly />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={user.pwd} readOnly />
          </div>
        </div>

        <p>Gamer Information</p>
        <br />
        <div className="contact-inputs">
          <div className="input-group full-width">
            <label htmlFor="gamingPlatform">Gaming Platform</label>
            <input
              type="text"
              id="gamingPlatform"
              value={gamingPlatform}
              onChange={(e) => setGamingPlatform(e.target.value)}
              placeholder="PC, PlayStation, Xbox, Nintendo Switch"
            />
          </div>

          <div className="input-group">
            <label htmlFor="gamerTag">Gamer Tag</label>
            <input
              type="text"
              id="gamerTag"
              value={gamerTag}
              onChange={(e) => setGamerTag(e.target.value)}
              placeholder="Gamer Tag"
            />
          </div>

          <div className="input-group">
            <label htmlFor="playstyle">Playstyle</label>
            <input
              type="text"
              id="playstyle"
              value={playstyle}
              onChange={(e) => setPlaystyle(e.target.value)}
              placeholder="Competitive, Casual, Solo, Multiplayer"
            />
          </div>

          <div className="input-group">
            <label htmlFor="streamingLink">Streaming Link/Channel</label>
            <input
              type="text"
              id="streamingLink"
              value={streamingLink}
              onChange={(e) => setStreamingLink(e.target.value)}
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="about-me-input">
          <p>About Me</p>
          <textarea
            id="aboutMe"
            rows="4"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            placeholder="Write a short bio about yourself or your gaming journey"
          />
        </div>

        <button onClick={handleUpdate} className="btn">
          Update Info
        </button>
      </div>
      <div className="userprofile">
          <img className="imgavt" src="/src/imgs/avatars/alien.png" onClick={()=>handleImageClick("/src/imgs/avatars/alien.png")}/>
          <img className="imgavt" src="/src/imgs/avatars/alien.png" onClick={()=>handleImageClick("/src/imgs/avatars/3.png")}/>
          <img className="imgavt" src="/src/imgs/avatars/alien.png" onClick={()=>handleImageClick("/src/imgs/avatars/4.png")}/>
          <img className="imgavt" src="/src/imgs/avatars/alien.png" onClick={()=>handleImageClick("/src/imgs/avatars/5.png")}/>
          <img className="imgavt" src="/src/imgs/avatars/alien.png" onClick={()=>handleImageClick("/src/imgs/avatars/6.png")}/>
      </div>
    </div>
  );
}
