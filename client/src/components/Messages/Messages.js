import React, {useRef, useEffect, useState} from "react";

import "./Messages.css";

function Messages({ messages, name }) {
  const [scroll, setScroll] = useState(true)
  const msgDivNode= useRef() // the node is in the current property
  
  useEffect(()=> {
    msgDivNode.current.addEventListener('scroll', () => shouldScroll())
  }, [])

  useEffect(() => {
    if (msgDivNode.current.clientHeight < msgDivNode.current.scrollHeight){
      if (scroll) {
        (msgDivNode.current.scrollTop = msgDivNode.current.scrollHeight - msgDivNode.current.clientHeight)
      }
    }
  })

  function shouldScroll() {
    ( msgDivNode.current.scrollTop + msgDivNode.current.clientHeight < msgDivNode.current.scrollHeight) ?
      setScroll(false) :
      setScroll(true)
  }
  
  
  
  return (
      <div ref={msgDivNode} className="all-messages">  {/* we cab access and play with this node using the ref */}
        {messages.map((msg, i) => 
        msg.user === 'admin' ? (<p key={i} className='admin-msg'>{msg.text}</p>) :
        
          msg.user === name ? 
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
