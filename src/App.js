import React, { Component } from 'react';
import Graph from './components/graph';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { stockList: null };

    this.getStockData = this.getStockData.bind(this);
  }

  // Runs as soon as App is mounted to dom
  // and gets stock data.
  componentDidMount() {
    this.getStockData();
  }

  getStockData() {
    const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    ];

    this.setState({
      stockList: data 
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
