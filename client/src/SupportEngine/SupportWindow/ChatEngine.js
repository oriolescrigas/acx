import React, { useEffect, useState } from 'react';

import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine';

const ChatEngine = props => {
    return (
        <div
            className='transition-5'
            style={{ 
                    height: props.visible ? '100%' : '0px',
                    zIndex: props.visible ? '100' : '0',
                    width: '100%',
                    backgroundColor: 'white',
                }
            }
        >
            {
                props.visible &&
                <ChatEngineWrapper>
                    <Socket 
                        projectID={process.env.REACT_APP_CE_PROJECT_ID}
                        userName={props.user.email}
                        userSecret={props.user.email}
                    />
                    <ChatFeed activeChat={props.chat.id} />
                </ChatEngineWrapper>
            }
        </div>
    )
}

export default ChatEngine;

const styles = {
    chatEngineWindow: {
        width: '100%',  
        backgroundColor: '#fff',
    }
}
