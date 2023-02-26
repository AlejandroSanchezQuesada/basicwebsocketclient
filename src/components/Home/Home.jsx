import React from "react";
import { Chat } from "../Chat/Chat";

/* Componentes Bootstrap */

import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

/* Estilos Css Custom */
import styles from "./Home.module.css";

export const Home = () => {
    return (
        <Row className={styles.background}>
            <Col xs={12} sm={3} lg={3}>
                <h1>Crear Sala</h1>
                <Button variant="primary">Crear Sala</Button>
            </Col>
            <Col xs={12} sm={8} lg={8}>
                <Col><h1>Salas</h1></Col>
                <Col><Chat></Chat></Col>

            </Col>

        </Row>
    );
};

