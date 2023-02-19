import React, { useState } from "react";
import { WebSocketConnection } from "../SocksJSClient/WebSocketConnection";
//import TextMessageDTO from "../../dto/textMessajeDTO";
import envDev from '../../envDev.json';
import axios from 'axios';


export const Chat = () => {

    const AXIOS_URL = envDev.AXIOS_API_URL;

    const [listMessages, setListMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [user, setUser] = useState('');

    const newMessage = (message) => {
        console.log("newMessage", message);
        setListMessages([...listMessages, message]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = {};
        message.user = user;
        message.message = inputMessage;
        console.log("message", message);

        axios.post(AXIOS_URL + '/send', message).then(res => {
            console.log("res", res);
            console.log("res.data", res.data);
        }).catch(err => {
            console.log("err", err);
        }
        );

    }
    return (
        <div>
            <div>
                {listMessages.map((message, index) => {
                    return <li key={index}>{message}</li>
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={user} onChange={e => setUser(e.target.value)} defaultValue={"Usuario"} />
                <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} />

                <input type="submit" />
            </form>
            <WebSocketConnection nuevoMensaje={newMessage}></WebSocketConnection>
        </div>
    );
};