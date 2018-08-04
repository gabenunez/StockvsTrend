import React, { Component } from 'react';
import StockGraph from './components/stock_graph';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      stockList: null,
      trendsData: null
    };
  }

  // Runs as soon as App is mounted to dom
  // and gets stock data.
  componentDidMount() {
    this.getStockData();

    this.callApi()
    .then(trendsData => this.setState({ trendsData }))
    .catch(err => console.log(err));
  }

  // Magic from 
  // https://tinyurl.com/nodewithreact
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    
    const parsedData = JSON.parse(body.results);

    console.log(parsedData.default);

    if (response.status !== 200) throw Error(body.message);

    return parsedData;
  };

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