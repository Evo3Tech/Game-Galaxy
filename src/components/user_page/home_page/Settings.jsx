import React, { useState } from "react";
import "../../../css/user_page/profile.css";

export default function Settings() {
  const [username, setUsername] = useState("Jessica.Jones");
  const [email, setEmail] = useState("sifeddineafram@gmail.com");
  const [password, setPassword] = useState("password123");
  const [gamingPlatform, setGamingPlatform] = useState("");
  const [gamerTag, setGamerTag] = useState("");
  const [playstyle, setPlaystyle] = useState("");
  const [streamingLink, setStreamingLink] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  return (
    <div className="User-container">
        
      <div className="settings">
        <h3>my account</h3>
        <p>user information</p>
        <div className="info-inputs">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
              placeholder="competitive, casual, solo, multiplayer"
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
            placeholder="Write a short bio about yourself or your gaming journey"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
