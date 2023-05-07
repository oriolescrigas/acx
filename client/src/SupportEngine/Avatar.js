import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';

import { styles } from './styles';

const Avatar = props => {
    const [hovered, setHovered] = useState(false);

    return (
        <div style={{ position: 'fixed', bottom: '24px', right:'24px'}}>
            <div 
                className='transition-3'
                style={{
                    ...styles.avatarHello,
                    ...{ opacity: hovered ? '1' : '0' }
                }}
            >
                En qué puedo ayudarte? 🤙
            </div>

            <div 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
                className='transition-3'
                style={{
                    ...styles.chatWithMeButton,
                    ...{ border: hovered ? '1px solid #f9f0ff' : '4px solid #1A97F5' }
                }}
            > 
                <FaComments 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        height: '50%',
                        color: 'white',
                    }}
                />
            </div>
            
        </div>
    )
}

export default Avatar;