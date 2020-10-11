import React from "react";
import "./Messages.css";

function Messages({ messages, nickName }) {

  return (

            <div className="all-messages">
      {messages.map((msg, i) => 
        msg.user === 'admin' ? (<p key={i} className='admin-msg'>{msg.text}</p>) :
        
          msg.user === nickName ? 
          (<div key={i} className="my-msg">
            <p className="my-name">{msg.user}</p>
            <p className="my-text">{msg.text}</p>
          </div>) :
          (<div key={i} className="user-msgs">
            <p className="msg-text">{msg.text}</p>
            <p className="user-name">{msg.user}</p>
          </div>)
      )}
    </div>


  );
}

export default Messages;
