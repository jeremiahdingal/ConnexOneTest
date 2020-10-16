import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RightView from './views/RightView'
import LeftView from './views/LeftView'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="App">
        <Container>
          <Row xs={6}>
            <Col xs={6}>
              <LeftView/>
            </Col>
            <Col  xs={6}>
              <RightView/>
            </Col>
          </Row>
        </Container>
        
      </div>
    );
  }
  
}

export default App;
