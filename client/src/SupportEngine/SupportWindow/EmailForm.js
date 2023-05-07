import React, { useState } from 'react';

import { styles } from '../styles';

import { LoadingOutlined } from '@ant-design/icons';

import axios from 'axios';

import Avatar from '../Avatar';

const EmailForm = props => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    function getOrCreateUser(callback) {
        axios.put(
            'https://api.chatengine.io/users/',
            {username: email, email: email, secret: email},
            {headers: {"Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY}}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create user error', e))
    }

    function getOrCreateChat(callback) {
        axios.put(
            'https://api.chatengine.io/chats/',
            {usernames: ['Oriol Escrigas', email], is_direct_chat: true},
            {headers: {"Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY}}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create chat error', e))
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true)

        console.log('Sending Email', email);

        getOrCreateUser(
            user => {
                props.setUser && props.setUser(user)
                getOrCreateChat(chat => {
                    console.log('success', chat)
                    setLoading(false)
                    props.setChat && props.setChat(chat)
                })
            }
        )
    }

    return (
        <div
            style={{
                ...styles.emailFormWindow,
                ...{ 
                    height: props.visible ? '100%' : '0%',
                    opacity: props.visible ? '1' : '0',
                }
            }}
        >
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />
            </div>

            <div 
                className='transition-5'
                style={{
                    ...styles.loadingDiv,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '0.33' : '0',
                    }
                }}
            />

            <LoadingOutlined
                className='transition-5'
                style={{
                    ...styles.loadingIcon,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '1' : '0',
                        fontSize: '82px',
                        top: 'calc(50% - 41px)', 
                        left: 'calc(50% - 41px)',  
                    }
                }}
            />

            <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                <div style={styles.topText}>
                    Bienvenido al <br /> Chatbot de prueba 👋
                </div>
            </div>

            <form 
                onSubmit={e => handleSubmit(e)}
                style={{ position: 'relative', width: '100%', top: '40%', left: '17%' }}
            >
                <input 
                    placeholder='Tu email'
                    onChange={e => setEmail(e.target.value)}
                    style={styles.emailInput}
                />
            </form>

            <div style={styles.bottomText}>
                Introduce tu email <br /> para empezar.
            </div>

        </div>
    )
}

export default EmailForm
