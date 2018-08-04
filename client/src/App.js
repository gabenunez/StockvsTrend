import React, { Component } from 'react';
import Graph from './components/graph';

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

    this.getTrendData()
    .then(trendsData => this.setState({ trendsData }))
    .catch(err => console.log(err));
  }

  // Magic from 
  // https://tinyurl.com/nodewithreact
  getTrendData = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    
    const parsedData = JSON.parse(body.results);

    if (response.status !== 200) throw Error(body.message);

    return parsedData.default.timelineData;
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
            <div className='row'>
              <div className='col-md-12'>
                <Graph 
                  list={this.state.stockList} 
                  line_name='Stock'
                  line_dataKey='close'
                  xAxis_dataKey='date'
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12'>
                <Graph 
                  list={this.state.trendsData}
                  line_name='Google Trend'
                  line_dataKey='value'
                  xAxis_dataKey='formattedTime'
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
