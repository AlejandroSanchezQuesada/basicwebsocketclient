import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import axios from 'axios';
import TextMessageDTO from './textMessajeDTO.ts';

const SOCKET_URL = 'http://localhost:8085/chatspring';
const AXIOS_URL = 'http://localhost:8085';

const App = () => {
  const [message, setMessage] = useState('You server message here.');
  const [listMessages, setListMessages] = useState([]);

  const [inputMessage, setInputMessage] = useState('');
  const [user, setUser] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    let textMessageDTO = new TextMessageDTO(user, inputMessage);
    console.log("textMessageDTO", textMessageDTO);


    axios.post(AXIOS_URL + '/send', textMessageDTO).then(res => {
      console.log("res", res);
      console.log("res.data", res.data);
    }).catch(err => {
      console.log("err", err);
    }
    );

  }


  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    setMessage(msg.message);
    listMessages.push(msg.message);
    setListMessages(listMessages);
  }

  return (
    <div >
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <h1>Paco Chat</h1>
      <h1>--------------</h1>
      <ul>
        {listMessages.map((message, index) => {
          return <li key={index}>{message}</li>
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={user} onChange={e => setUser(e.target.value)} defaultValue={"Usuario"} />
        <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} />

        <input type="submit" />
      </form>


    </div>
  );
}

export default App;