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
                id='stock' 
                placeholder='i.e. AAPL' 
            />
            </div>

            <div className='form-group'>
                <label htmlFor='trends'>Google Trends Search Term:</label>
                <input
                    value={props.trendSearchTerm} 
                    onChange={props.handleInputChange}
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
                    value={props.dateRange} 
                    onChange={props.handleInputChange} 
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
                    <button onClick={props.resetFormFields} className='btn btn-light btn-block'>Reset</button>
                </div>
            </div>
        </form>
    )
};

export default Form;