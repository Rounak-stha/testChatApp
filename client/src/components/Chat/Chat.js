import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import io from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import Messages from "../Messages/Messages";
import Header from '../Header/Header'
import "./chat.css";

let socket;
let endPoint = "https://chatserver999.herokuapp.com/";

function Chat() {
  const [nickName, setNickName] = useState("");
  const [room, setRoom] = useState("");
  const [myMsg, setMyMsg] = useState('')
  const [messages, setMessages] = useState([]);
  const [redirect, setRedirect] = useState(false)


  useEffect(() => {
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


    socket.emit("addMe", { name: nickName, room }, ({error, myName}) => {
      if (error)  setRedirect(true)
      else console.log(`${myName} has joined`)
    });

    return () => {
      console.log('disconnect')
      socket.disconnect()
    }
      
  }, [])


  useEffect(() => {
    socket.on('message', ({name, text}) => {
      let newMsgArr = [...messages, {user: name, text}]
      setMessages(newMsgArr)
    })
  }, [messages])

  const handleMsgs = (e) => {
      if (e.keyCode === 13 || e.target.name === 'sendBtn' || e.currentTarget.name === 'sendBtn') {
        socket.emit('userMsg', {name: nickName, room, myMsg})
        setMessages([...messages, {user: nickName, text: myMsg}])
        setMyMsg('')
      }
      
  }

  return (
    redirect ? (<Router><Redirect exact to={{
      pathname: '/',
      search: '?error=userexists'
    }}/></Router>) :
    (<div className="message-page-container">
      <div className="main-container">
        <Header room={room} />
        <Messages messages={messages} nickName={nickName} />
        <div className="inp_btn-container">
          <textarea 
            value={myMsg} 
            onChange={(e) => setMyMsg(e.target.value)} 
            onKeyDown={(e) => handleMsgs(e)}
            className="msg-input" 
            type="text" 
          />
          <button 
            name='sendBtn'
            className="msg-btn" 
            type="submit"
            onClick={(e) => handleMsgs(e)}  
          >
            <FontAwesomeIcon onClick={(e) => false} icon={faPaperPlane} /> 
          </button>
        </div>
      </div>
    </div>)
  );
}

export default Chat;
