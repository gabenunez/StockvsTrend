import React, { Component } from 'react';
import Graph from './components/graph';
import Form from './components/form';
import { connect } from 'react-redux';
import { fetchStockData } from './actions/stockActions';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickerSymbol: 'WATT',
      trendIsInvalid: false,

      trendsData: null,
      selectedTrend: null,
      trendSearchTerm: 'Energous',
      dateRange: '2 Years',

      dateRangeError: '',
      trendApiError: ''
    };

    this.resetFormFields = this.resetFormFields.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.updateGraphsWithState = this.updateGraphsWithState.bind(this);
  }

  componentDidMount() {
    // Runs as soon as App is mounted to dom
    // and gets stock data.

    this.updateGraphsWithState();
  }

  updateGraphsWithState() {
    this.props.fetchStockData(this.state.tickerSymbol, this.state.dateRange);
    this.getTrendData(this.state.trendSearchTerm, this.state.dateRange);
  }

  resetFormFields() {
    this.setState({
      tickerSymbol: 'WATT',
      trendSearchTerm: 'Energous',
      dateRange: '2 Years'
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    let value = target.type === 'checkbox' ? target.checked : target.value;

    if (name === 'tickerSymbol') {
      value = value.toLocaleUpperCase();
    }

    this.setState({
      [name]: value
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();

    // Check if date range is selected
    if (this.state.dateRange === 'Select a date range') {
      this.setState({
        dateRangeError: true
      });

      return;
    }

    this.setState({
      dateRangeError: false
    });

    this.updateGraphsWithState();
  }

  async fetchData(apiEndpoint, apiParams) {
    let urlParms = '';
    Object.keys(apiParams).forEach(key => {
      urlParms += `${key}=${apiParams[key]}&`;
    });

    const response = await fetch(`/api/${apiEndpoint}?${urlParms}`);

    let body;
    if (response.status !== 200) {
      const errorMsg = 'Unable to connect to API server.';
      this.setState({
        stockApiError: errorMsg,
        trendApiError: errorMsg
      });
      body = null;
    } else {
      body = await response.json();
    }

    return body;
  }

  async getTrendData(trendSearchTerm, dateRange) {
    // Magic from
    // https://tinyurl.com/nodewithreact

    // Trim whitespace from both sides of search term
    const searchTerm = trendSearchTerm.trim();

    // Auto-magically set trendInvalid to false
    this.setState({
      trendIsInvalid: false,
      trendApiError: ''
    });

    // Checks if entered term isn't empty
    if (searchTerm.length < 1) {
      this.setState({
        trendIsInvalid: true,
        trendsData: null
      });

      return;
    }

    // Check if trend is already selected, then sets null (for loading effect)
    if (searchTerm !== this.state.selectedTrend) {
      this.setState({
        trendsData: null,
        selectedTrend: null
      });
    }

    // Get dat data from Google Trends!
    let trendsData = await this.fetchData('googletrends', {
      dateRange,
      searchTerm
    });

    // Check we actually get some data
    if (!trendsData) {
      return;
    }

    // Parse this JSON to an object
    trendsData = JSON.parse(trendsData.results);

    // Check if we got the data we expected.
    if (!trendsData.default.timelineData) {
      console.log(trendsData);
      this.setState({
        trendIsInvalid: true
      });
    }

    // Just one more extra step to get the timeline data!
    trendsData = trendsData.default.timelineData;

    // Check we get a response back with data
    if (trendsData.length < 1) {
      this.setState({
        trendIsInvalid: true,
        selectedTrend: searchTerm,
        trendsData: null
      });

      return;
    }

    // Set state of trends if all checks pass!
    this.setState({
      trendsData: trendsData,
      selectedTrend: searchTerm
    });
  }

  render() {
    return (
      <div className="jumbotron vertical-center">
        <div className="container">
          <div className="row">
            <div className="col-md-4 order-1 sidebar">
              <h1 className="text-center">
                <span className="stock-color">Stock</span> vs{' '}
                <span className="trend-color">Trend</span>
              </h1>
              <p className="open-source">
                <a href="https://github.com/gabenunez/StockvsTrend/..">
                  An Open Source Project
                </a>{' '}
                by <a href="https://github.com/gabenunez/">Gabe Nunez</a>
              </p>
              <Form
                resetFormFields={this.resetFormFields}
                handleInputChange={this.handleInputChange}
                handleOnSubmit={this.handleOnSubmit}
                tickerSymbol={this.state.tickerSymbol}
                trendSearchTerm={this.state.trendSearchTerm}
                dateRange={this.state.dateRange}
                dateRangeError={this.state.dateRangeError}
                stockIsInvalid={this.state.stockIsInvalid}
                trendIsInvalid={this.state.trendIsInvalid}
              />

              <p className="text-center feedback">
                <a href="https://mailchi.mp/2b50831a14a6/gabenunez">
                  I'm working on a new project... want in? <br /> I promise it's
                  highly related.
                </a>
              </p>
            </div>
            <div className="col-md-8 order-2 graph-container">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="text-center stock-color graph-heading">
                    Stock{' '}
                    {this.props.selectedTicker
                      ? `(${this.props.selectedTicker.toLocaleUpperCase()})`
                      : ''}
                  </h3>
                  <div className="graph-div">
                    <Graph
                      list={this.props.stockData}
                      line_name="Stock"
                      line_dataKey="close"
                      line_color="#8884d8"
                      xAxis_dataKey="label"
                      stockIsInvalid={this.props.stockIsInvalid}
                      stockApiError={this.props.stockApiError}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <h3 className="text-center trend-color graph-heading">
                    Trend{' '}
                    {this.state.selectedTrend || this.state.trendIsInvalid
                      ? `(${this.state.selectedTrend})`
                      : ''}
                  </h3>
                  <div className="graph-div">
                    <Graph
                      list={this.state.trendsData}
                      line_name="Google Trend"
                      line_dataKey="value"
                      line_color="#f54336"
                      xAxis_dataKey="formattedTime"
                      trendIsInvalid={this.state.trendIsInvalid}
                      trendApiError={this.state.trendApiError}
                    />
                  </div>
                  <p className="text-center attribution">
                    Stock data provided for free by{' '}
                    <a href="https://iextrading.com/developer/">IEX</a>.{' '}
                    <a href="https://iextrading.com/api-exhibit-a/">
                      View IEX’s Terms of Use
                    </a>
                    .
                  </p>
                  <p className="text-center disclaimer">
                    Disclaimer: We are not liable for any losses associated with
                    the use of this tool.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stockData: state.stocks.stockData,
  selectedTicker: state.stocks.selectedTicker,
  stockIsInvalid: state.stocks.stockIsInvalid,
  stockApiError: state.stocks.stockApiError
});

export default connect(
  mapStateToProps,
  { fetchStockData }
)(App);
