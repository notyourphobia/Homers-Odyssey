import React, { Component } from 'react';
import SignUp from './Components/SignUp';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import "./App.css";


export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Container>
          <Row>
            <SignUp />
          </Row>
        </Container>
      </div>
    );
  }
}
