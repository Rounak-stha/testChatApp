import React, {useState, useEffect} from 'react'
import Messages from "../Messages/Messages";
import InputContainer from '../InputContainer/InputContainer'
import './MainBody.css'

function MainBody({socket, name, room}) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', ({name, text}) => {
          setMessages((prevMessages) => [...prevMessages, {user: name, text}])
        })
      },[])
    
      const handleMsgs = (myMsg) => {
          socket.emit('userMsg', {name, room, myMsg})
          setMessages([...messages, {user: name, text: myMsg}])
    }

    return (<div className='mainbody'>
        <Messages messages={messages} name={name} />
        <InputContainer handleMsgs={handleMsgs} />
    </div>)
}

export default MainBody