import React, { Component } from 'react';
import Graph from './components/graph';
import Form from './components/form';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      stockData: null,
      trendsData: null,
      tickerSymbol: 'AAPL',
      trendSearchTerm: 'iPhones',
      dateRange: '1 Year'
    };

    this.resetFormFields = this.resetFormFields.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // Runs as soon as App is mounted to dom
    // and gets stock data.

    this.getStockData();
    this.getTrendData();
  }

  getTrendData() {
    // Magic from 
    // https://tinyurl.com/nodewithreact

    const getData = async () => {
      const response = await fetch('/api/hello');
      const body = await response.json();
      
      const parsedData = JSON.parse(body.results);
  
      if (response.status !== 200) throw Error(body.message);
  
      return parsedData.default.timelineData;
    };

    getData()
      .then(trendsData => this.setState({ trendsData }))
      .catch(err => console.log(err));
  }

  getStockData() {
    // Get stock data from the remote api and set that as state.

    axios.get('https://api.iextrading.com/1.0/stock/watt/chart/6m')
    .then((response) => {
      const data = response.data;

      this.setState({
        stockData: data
      });

    }).catch((error) => {
      console.log(error);
    });
  }

  resetFormFields() {
    this.setState({
        tickerSymbol: '',
        trendSearchTerm: '',
        dateRange: 'select-date'
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-4 order-1'>
            <h1 className='text-center'>Stocks vs Trends</h1>
            <Form
              resetFormFields={this.resetFormFields}
              handleInputChange={this.handleInputChange}
              handleOnSubmit={this.handleOnSubmit}

              tickerSymbol={this.state.tickerSymbol}
              trendSearchTerm={this.state.trendSearchTerm}
              dateRange={this.state.dateRange}
            />
          </div>
          <div className="col-md-8 order-2">
            <div className='row'>
              <div className='col-md-12'>
                <Graph 
                  list={this.state.stockData} 
                  line_name='Stock'
                  line_dataKey='close'
                  line_color='#8884d8'
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
                  line_color='#f54336'
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
