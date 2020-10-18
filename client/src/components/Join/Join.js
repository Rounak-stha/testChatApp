import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

function Join() {
  const [nickName, setNickName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [validName, setValidName] = useState(false);


  const handleInput = ({ name, value }) => {
   name === "nickname" ? setNickName(value) : setRoomName(value)

  };

  useEffect(() => {
    if (nickName && roomName) setValidName(true);
  }, [nickName, roomName]);

  return (
    <div className="join-form">
        <select
          className="room-select"
          name="roomname"
          value={roomName}
          onChange={(e) => handleInput(e.target)}
        >
          <option value="default">Select a room</option>
          <option value="haha">haha</option>
          <option value="lolol">lolol</option>
          <option value="insane">insane</option>
          <option value="qwerty">qwerty</option>
      </select>

      <input
        className="nickname-input"
        name="nickname"
        placeholder="Nickname"
        type="text"
        value={nickName}
        onChange={(e) => handleInput(e.target)}
      />

      <Link
        className="chat-link"
        to={validName ? `/chat?nickname=${nickName}&room=${roomName}` : "/"}
      >
        <button className="join_btn">Join</button>
      </Link>
    </div>
  );
}

export default Join;
