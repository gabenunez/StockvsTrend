import React from 'react';

const Form = (props) => {
    return (
        <form>
            <div className='form-group'>
                <label for='stock'>Ticker Symbol:</label>
                <input type='text' name='stock-ticker' className='form-control' id='stock' placeholder='i.e. AAPL' />
            </div>

            <div className='form-group'>
                <label for='trends'>Google Trends Search Term:</label>
                <input type='text' name='trends' className='form-control' id='trends' placeholder='i.e. Steve Wozniak' />
            </div>

            <div className='form-group'>
                <label for='date-select'>Date Range:</label>
                <select className='form-control' id='date-select'>
                    <option>1 Month</option>
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                    <option>2 Years</option>
                    <option>5 Years</option>
                </select>
            </div>
            
            <div className='form-row'>
                <div className='col'>
                    <button type='submit' className='btn btn-primary btn-block'>Submit</button>
                </div>
                <div className='col'>
                    <button type='submit' className='btn btn-light btn-block'>Reset</button>
                </div>
            </div>
        </form>
    );
}

export default Form;