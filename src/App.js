import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FirstComponent } from './components/Component1'
import DashboardLeft from './components/DashboardLeft'
import DashboardCenter from './components/DashboardCenter'
import DashboardRight from './components/DashboardRight'
import { TestJSX } from './components/TestJSX'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TwilioTest from './components/TwilioTest';


function App() {
  return (
    <div className="App">
       <Row className="m-0">
        <Col><DashboardCenter /></Col>
        <Col><FirstComponent name="mitra" id="34" /></Col>
        <Col><FirstComponent name="riya" id="12" /></Col>
      </Row> 

      <TwilioTest></TwilioTest>

    </div>
  );
}

export default App;
