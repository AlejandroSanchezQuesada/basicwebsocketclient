import React from 'react';
import SockJsClient from 'react-stomp';
import envDev from '../../envDev.json';

export const WebSocketConnection = (props) => {

  const SOCKET_URL = envDev.SOCKET_URL;

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    console.log("New Message Received!!", msg);
    props.nuevoMensaje(msg.message);
  }

  return (
    <SockJsClient
      url={SOCKET_URL}
      topics={['/topic/message']}
      onConnect={onConnected}
      /* onDisconnect={console.log("Disconnected!")} */
      onMessage={(msg) => onMessageReceived(msg)}
      debug={false}
    />
  );
};


