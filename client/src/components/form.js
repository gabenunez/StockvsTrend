import React from 'react';

const Form = (props) => {
    return (
        <form onSubmit={props.handleOnSubmit}>
            <div className='form-group'>
            <label htmlFor='stock'>Ticker Symbol:</label>
            <input 
                value={props.tickerSymbol} 
                onChange={props.handleInputChange} 
                type='text' 
                name='tickerSymbol' 
                className='form-control'
                placeholder='i.e. AAPL'
                maxLength='8'
            />
            <div className='form-error'>{props.stockIsInvalid ? 'Sorry, that ticker doesn\'t exist.' : null}</div>
            </div>

            <div className='form-group'>
                <label htmlFor='trends'>Google Trends Search:</label>
                <input
                    value={props.trendSearchTerm} 
                    onChange={props.handleInputChange}
                    type='text' 
                    name='trendSearchTerm' 
                    className='form-control' 
                    placeholder='i.e. iPhones'
                />
                <div className='form-error'>{props.trendIsInvalid ? 'Sorry, there\'s no data available.' : ''}</div>
            </div>

            <div className='form-group'>
                <label htmlFor='date-select'>Date Range:</label>
                <select 
                    name='dateRange' 
                    value={props.dateRange} 
                    onChange={props.handleInputChange} 
                    className='form-control' 
                    id='date-select'
                >
                    <option>Select a date range</option>
                    <option>1 Year</option>
                    <option>2 Years</option>
                    <option>5 Years</option>
                </select>
                <div className='form-error'>{props.dateRangeError ? 'Please select a date range.' : ''}</div>
            </div>
            
            <div className='form-row'>
                <div className='col'>
                    <button type='submit' className='btn btn-primary btn-block'>Submit</button>
                </div>
                <div className='col'>
                    <button onClick={props.resetFormFields} className='btn btn-light btn-block'>Reset</button>
                </div>
            </div>
        </form>
    )
};

export default Form;
