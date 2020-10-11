import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandPeace} from '@fortawesome/free-solid-svg-icons'
import './Header.css'

function Header({room}) {
    return (
        <div className="chatroom-header">
                <FontAwesomeIcon className='icon' icon={faHandPeace} />
            <p className='room-name'>{room}</p>
        </div>
    )
}

export default Header
