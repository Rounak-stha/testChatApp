import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import './InputContainer.css'

function InputContainer({handleMsgs}) {
    const [myMsg, setMyMsg] = useState('')

    function handleSend(e) {
      if (myMsg.length === 0) return
      if (e.keyCode === 13 || e.target.name === 'sendBtn' || e.currentTarget.name === 'sendBtn') {
            handleMsgs(myMsg)
            setMyMsg('')
        }
    }

    function handleChange(e) {
      if (e.target.value === '\n') return // I was so dumb... this took me a long time
      setMyMsg(e.target.value)
    }


    return (
        <div className="inp_btn-container">
         
          <textarea 
            value={myMsg}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleSend(e)}
            className="msg-input" 
            type="text" 
          />
          <button 
            name='sendBtn'
            className="msg-btn" 
            type="submit"
            onClick={(e) => handleSend(e)}  
          >
            <FontAwesomeIcon onClick={(e) => false} icon={faPaperPlane} /> 
          </button>
        </div>
    )
}

export default InputContainer
