import React, { Component } from 'react';
import Graph from './components/graph';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      stockList: null
    };

    this.getStockData = this.getStockData.bind(this);
  }

  // Runs as soon as App is mounted to dom
  // and gets stock data.
  componentDidMount() {
    this.getStockData();
  }

  getStockData() {

  axios.get('https://api.iextrading.com/1.0/stock/watt/chart/6m')
  .then((response) => {
    const data = response.data;

    this.setState({
      stockList: data 
    });

  }).catch((error) => {
    console.log(error);
  });
  }

  render() {
    return (
      <div className="container">
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center'>Stocks vs Trends</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <Graph stockList={this.state.stockList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
