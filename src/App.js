import React, { Component } from 'react';
import StockGraph from './components/stock_graph';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      stockList: null
    };
  }

  // Runs as soon as App is mounted to dom
  // and gets stock data.
  componentDidMount() {
    this.getStockData();
  }

  getStockData() {
    // Get stock data from the remote api and set that as state.

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
            <StockGraph stockList={this.state.stockList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
