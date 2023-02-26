import React, { useEffect, useRef, useState } from "react";
import { WebSocketConnection } from "../SocksJSClient/WebSocketConnection";
import envDev from '../../envDev.json';
import axios from 'axios';

/* Componentes Bootstrap */
import { Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";

/* Estilos Css Custom */
import styles from "./Chat.module.css";

export const Chat = () => {
    const AXIOS_URL = envDev.AXIOS_API_URL;

    const [listMessages, setListMessages] = useState([]);
    const lastMessageRef = useRef();

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [listMessages]);

    const [inputMessage, setInputMessage] = useState('');
    const [user, setUser] = useState('');

    const newMessage = (message) => {
        console.log("newMessage", message);
        setListMessages([...listMessages, message]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = {};
        message.userName = user;
        message.message = inputMessage;
        console.log("message", message);

        axios.post(AXIOS_URL + '/send', message).then(res => {
            console.log("res", res);
            console.log("res.data", res.data);
            setInputMessage('');
        }).catch(err => {
            console.log("err", err);
        });
    }

    return (
        <Row className={styles.chatbox}>
            <Col className={styles.chat__box} xs={12} sm={3} lg={3}>
                {listMessages.map((message, index) => {
                    return (
                        <Card key={index}>
                            <Card.Body ref={index === listMessages.length - 1 ? lastMessageRef : null}>
                                {message}
                            </Card.Body>
                        </Card>
                    );
                })}
                <div ref={lastMessageRef} />
            </Col>
            <Col className={styles.chat__sending} xs={12} sm={9} lg={9}>
                <Form onSubmit={handleSubmit}>
                    <Form.Control type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="Nombre de usuario" />
                    <Form.Control type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} placeholder="Mensaje a Enviar" />
                    <Form.Control type="submit" className={styles.chat__submit} value="Enviar Mensaje" />
                </Form>
            </Col>
            <WebSocketConnection nuevoMensaje={newMessage} />
        </Row>
    );
};
