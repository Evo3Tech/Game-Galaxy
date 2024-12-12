import React, { useState, useEffect } from "react";
import "../../../css/user_page/profile.css";
import { changeAvatar } from '../../../redux_store/user/userSlice'

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { modifier } from '../../../redux_store/user/userSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let user = useSelector((state) => state.user);
  if(user.info == null) return
  user = user.info    

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
  }

  let imgs = []
  {
    for (let i = 1; i < 6; i++) {
      if(user.avatar == `/src/imgs/avatars/${i}.png`) {
        imgs.push(
          <span className="checked_img">
            <img className="imgavt active" src={`/src/imgs/avatars/${i}.png`}/>
            <svg id="checked" width="64px" height="64px" viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-checked" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>1228</title> <defs> </defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <path d="M3.432,6.189 C3.824,5.798 4.455,5.798 4.847,6.189 L6.968,8.31 L13.147,2.131 C13.531,1.747 14.157,1.753 14.548,2.144 L16.67,4.266 C17.06,4.657 17.066,5.284 16.684,5.666 L7.662,14.687 C7.278,15.07 6.651,15.064 6.261,14.673 L1.311,9.723 C0.92,9.333 0.92,8.7 1.311,8.31 L3.432,6.189 Z" fill="currentColor" class="si-glyph-fill"> </path> </g> </g></svg>
          </span>
        )
      }
      else{
        imgs.push(
            <img className="imgavt" src={`/src/imgs/avatars/${i}.png`} onClick={()=>handleImageClick(`/src/imgs/avatars/${i}.png`)}/>
        )
      }
    }
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
      <div className="userprofile imgs_settings">
        <h1>Change profile image</h1>
        <div className="imgs">
          {
            imgs
          }
        </div>
      </div>
    </div>
  );
}
