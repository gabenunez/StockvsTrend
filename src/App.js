import React, { Component } from 'react';
import Graph from './components/graph';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Stocks vs Trends</h1>
            <Graph />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
