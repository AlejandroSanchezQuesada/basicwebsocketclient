import React from 'react';
import { Home } from './components/Home/Home';

/* Bootstrap Components */
import { Container } from 'react-bootstrap';

/* Custom Css Styles */

import styles from './App.module.css';


const App = () => {


  return (
    <Container className={styles.background}>
      <Home></Home>
    </Container>
  );
}

export default App;