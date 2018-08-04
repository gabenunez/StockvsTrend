import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tickerSymbol: 'AAPL',
            trendSearchTerm: 'iPhones',
            dateRange: '1 Year'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.resetFormFields = this.resetFormFields.bind(this);
    }

    resetFormFields() {
        this.setState({
            tickerSymbol: '',
            trendSearchTerm: '',
            dateRange: 'select-date'
        });
    }

    handleOnSubmit(event) {
        event.preventDefault();
    }

    // Ugly! Fix all these into something better.
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render() {
        return (
            <form onSubmit={this.handleOnSubmit}>
                <div className='form-group'>
                <label htmlFor='stock'>Ticker Symbol:</label>
                <input 
                    value={this.state.tickerSymbol} 
                    onChange={this.handleInputChange} 
                    type='text' 
                    name='tickerSymbol' 
                    className='form-control' 
                    id='stock' 
                    placeholder='i.e. AAPL' 
                />
                </div>

                <div className='form-group'>
                    <label htmlFor='trends'>Google Trends Search Term:</label>
                    <input
                        value={this.state.trendSearchTerm} 
                        onChange={this.handleInputChange}
                        type='text' 
                        name='trendSearchTerm' 
                        className='form-control' 
                        id='trends' 
                        placeholder='i.e. iPhones'
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='date-select'>Date Range:</label>
                    <select 
                        name='dateRange' 
                        value={this.state.dateRange} 
                        onChange={this.handleInputChange} 
                        className='form-control' 
                        id='date-select'
                    >
                        <option value='select-date'>Select a date range</option>
                        <option value='1 Month'>1 Month</option>
                        <option value='3 Months'>3 Months</option>
                        <option value='6 Months'>6 Months</option>
                        <option value='1 Year'>1 Year</option>
                        <option value='2 Years'>2 Years</option>
                        <option value='5 Years'>5 Years</option>
                    </select>
                </div>
                
                <div className='form-row'>
                    <div className='col'>
                        <button type='submit' className='btn btn-primary btn-block'>Submit</button>
                    </div>
                    <div className='col'>
                        <button onClick={this.resetFormFields} className='btn btn-light btn-block'>Reset</button>
                    </div>
                </div>
            </form>
        )
    };
}

export default Form;