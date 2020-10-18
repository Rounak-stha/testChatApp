import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import io from "socket.io-client";
import MainBody from '../MainBody/MainBody'
import Header from '../Header/Header'

import "./chat.css";

let socket;
let endPoint = "127.0.0.1:9999";

function Chat() {
  const [nickName, setNickName] = useState("");
  const [room, setRoom] = useState("");
  const [isSocketDefined, setIsSocketDefined] = useState(false)
  
  
  const [redirect, setRedirect] = useState(false)


  useEffect(() => {
    console.log('chatjs')
    let nickName
    let room
    
    let params = window.location.search; // see window.location
    params = params.substring(1); // substring filters string, or extracts chars from string
    params = params.split("&");

    params.forEach((param) => {
      let arr = param.split("=");

      if (arr[0] === "nickname") nickName = (decodeURIComponent(arr[1]).trim());
      else room = (arr[1].trim());
    });

    setNickName(nickName)
    setRoom(room)

    socket = io(endPoint);


    socket.emit("addMe", { name: nickName, room }, ({error, nameObj}) => {
      if (error)  setRedirect(true)
      else console.log(`${nameObj.name} has joined`)
    });

    setIsSocketDefined(true)

    return () => {
      console.log('disconnect')
      socket.disconnect()
    }
      
  }, [])





  return (
    redirect ? (<Router><Redirect exact to={{
      pathname: '/',
      search: '?error=userexists'
    }}/></Router>) :
    (<div className="message-page-container">
      <div className="main-container">
        <Header room={room} />
        {isSocketDefined ? (<MainBody socket={socket} name={nickName} room={room}/>) : null}
      </div>
    </div>)
  );
}

export default Chat;
