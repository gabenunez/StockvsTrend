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
      tickerSymbol: 'AAPL',
      selectedTicker: null,
      stockData: null,

      trendsData: null,
      selectedTrend: null,
      trendSearchTerm: 'iPhones',
      dateRange: '1 Year'
    };

    this.resetFormFields = this.resetFormFields.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getStockData = this.getStockData.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.updateGraphsWithState = this.updateGraphsWithState.bind(this);
  }

  componentDidMount() {
    // Runs as soon as App is mounted to dom
    // and gets stock data.

    this.updateGraphsWithState();
  }

  updateGraphsWithState() {
    this.getStockData(this.state.tickerSymbol, this.state.dateRange);
    this.getTrendData(this.state.trendSearchTerm, this.state.dateRange);
  }

  resetFormFields() {
    this.setState({
        tickerSymbol: 'AAPL',
        trendSearchTerm: 'iPhones',
        dateRange: '1 Year'
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
    this.updateGraphsWithState();
  }

  getTrendData(trendSearchTerm, dateRange) {
    // Magic from 
    // https://tinyurl.com/nodewithreact

    const getData = async () => {
      const response = await fetch(
        `/api/hello?searchTerm=${trendSearchTerm}&dateRange=${dateRange}`
      );
      const body = await response.json();
      
      const parsedData = JSON.parse(body.results);
  
      if (response.status !== 200) throw Error(body.message);
  
      this.setState({
        selectedTrend: trendSearchTerm
      });

      return parsedData.default.timelineData;
    };

    getData()
      .then(trendsData => this.setState({ trendsData }))
      .catch(err => console.log(err));
  }

  getStockData(stockTicker, timeFrame) {
    // Get stock data from the remote api and set that as state.
    let formatedTimeFrame = null;

    switch (timeFrame) {
      case '1 Month':
        formatedTimeFrame = '1m';
        break;
      case '3 Months':
        formatedTimeFrame = '3m';
        break;
      case '6 Months':
        formatedTimeFrame = '6m';
        break;
      case '1 Year':
        formatedTimeFrame = '1y';
        break;
      case '2 Years':
        formatedTimeFrame = '2y';
        break;
      case '5 Years':
        formatedTimeFrame = '5y';
        break;
      default:
        console.log('Error with timeframe selection.')
        break;
    }

    axios.get(`https://api.iextrading.com/1.0/stock/${stockTicker}/chart/${formatedTimeFrame}`)
    .then((response) => {
      const data = response.data;

      console.log(data);
      this.setState({
        selectedTicker: stockTicker,
        stockData: data
      });

    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className='col-md-4 order-1 sidebar'>
            <h1 className='text-center'><span className='stock-color'>Stock</span> vs <span className='trend-color'>Trend</span></h1>
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
                <h3 className='text-center stock-color graph-heading'>Stock {this.state.selectedTicker ?  `(${this.state.selectedTicker.toLocaleUpperCase()})` : ''}</h3>
                <Graph 
                  list={this.state.stockData} 
                  line_name='Stock'
                  line_dataKey='close'
                  line_color='#8884d8'
                  xAxis_dataKey='label'
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12'>
                <h3 className='text-center trend-color graph-heading'>Trend {this.state.selectedTrend ?  `(${this.state.selectedTrend})` : ''}</h3>
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
