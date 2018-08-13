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
      tickerSymbol: 'WATT',
      selectedTicker: null,
      stockData: null,

      stockIsInvalid: false,
      trendIsInvalid: false,

      trendsData: null,
      selectedTrend: null,
      trendSearchTerm: 'Energous',
      dateRange: '5 Years'
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
        tickerSymbol: 'WATT',
        trendSearchTerm: 'Energous',
        dateRange: '5 Years'
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

  async fetchData(apiEndpoint, apiParams) {

    let urlParms = '';
    Object.keys(apiParams).forEach(key => {
      urlParms += `${key}=${apiParams[key]}&`
    });

    const response = await fetch(
      `/api/${apiEndpoint}?${urlParms}`
    );

    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    const parsedData = JSON.parse(body.results);

    return parsedData;
  }

  async getTrendData(trendSearchTerm, dateRange) {
    // Magic from 
    // https://tinyurl.com/nodewithreact

    // Trim whitespace from both sides of search term
    const trendTerm = trendSearchTerm.trim();

    // Auto-magically set trendInvalid to false
    this.setState({
      trendIsInvalid: false
    });
  
    // Checks if entered term isn't empty
    if (trendTerm.length < 1) {
      this.setState({
        trendIsInvalid: true,
        trendsData: null
      });

      return;
    }

    // Check if trend is already selected, then sets null (for loading effect)
    if (trendTerm !== this.state.selectedTrend) {
      this.setState({
        trendsData: null,
        selectedTrend: null
      });
    }

    let trendsData = await this.fetchData('googletrends', 
      {
        dateRange: dateRange,
        searchTerm: trendTerm
      }
    );
    
    trendsData = trendsData.default.timelineData;

    // Check we get a response back with data
    if (trendsData.length < 1) {
      this.setState({
        trendIsInvalid: true,
        selectedTrend: trendTerm,
        trendsData: null
      });

      return;
    }

    // Set state of trends if all checks pass!
    this.setState({ 
      trendsData: trendsData,
      selectedTrend: trendTerm
    });
  }

  getStockData(ticker, timeFrame) {

    const stockTicker = ticker.trim();

    this.setState({
      stockIsInvalid: false
    });

    let formatedTimeFrame;
    switch (timeFrame) {
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

    // Check stock ticker entry isn't empty
    if(stockTicker < 1) {
      this.setState({
        selectedTicker: stockTicker,
        stockIsInvalid: true,
        stockData: null
      });

      return;
    }

    // If ticker isn't the same, set stockData to null (for loading effect)
    if(stockTicker !== this.state.selectedTicker) {
      this.setState({
        stockData: null,
        selectedTicker: null
      });
    }

    axios.get(`https://api.iextrading.com/1.0/stock/${stockTicker}/chart/${formatedTimeFrame}`)
    .then((response) => {
      const data = response.data;

      this.setState({
        selectedTicker: stockTicker,
        stockData: data
      });

    }).catch((error) => {
      if (error.response.status === 404) {
        this.setState({
          selectedTicker: stockTicker,
          stockIsInvalid: true,
          stockData: null
        });
      } else {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <div className="jumbotron vertical-center">
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
                
                stockIsInvalid={this.state.stockIsInvalid}
                trendIsInvalid={this.state.trendIsInvalid}
              />
            </div>
            <div className="col-md-8 order-2">
              <div className='row'>
                <div className='col-md-12'>
                  <h3 className='text-center stock-color graph-heading'>Stock {this.state.selectedTicker ?  `(${this.state.selectedTicker.toLocaleUpperCase()})` : ''}</h3>
                  <div className='graph-div'>
                    <Graph 
                      list={this.state.stockData} 
                      line_name='Stock'
                      line_dataKey='close'
                      line_color='#8884d8'
                      xAxis_dataKey='label'
                      stockIsInvalid={this.state.stockIsInvalid}
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-12'>
                  <h3 className='text-center trend-color graph-heading'>Trend {this.state.selectedTrend || this.state.trendIsInvalid ? `(${this.state.selectedTrend})` : ''}</h3>
                  <div className='graph-div'>
                    <Graph 
                      list={this.state.trendsData}
                      line_name='Google Trend'
                      line_dataKey='value'
                      line_color='#f54336'
                      xAxis_dataKey='formattedTime'
                      trendIsInvalid={this.state.trendIsInvalid}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
