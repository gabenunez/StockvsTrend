import React from 'react';
import { 
    ResponsiveContainer, 
    LineChart, 
    Line, 
    XAxis,
    YAxis,
    CartesianGrid, 
    Tooltip
} from 'recharts';

const Graph = (props) => {

    if(!props.list) {
        // If no data is available, show css loader.
        return ( 
            <div className="cssload-container">
                <div className="cssload-loading"><i></i><i></i></div>
            </div>
        );
    }

    if(props.stockIsInvalid || props.trendIsInvalid) {
        return (
            <div className='graph-error'>
                <h4>
                    {props.stockIsInvalid ? 'Invalid Stock Ticker' : ''}
                    {props.trendIsInvalid ? 'No Data Available' : ''}
                </h4>
            </div>
        );
    }

    return (
        <ResponsiveContainer width='100%' height='100%'>
            <LineChart 
                data={props.list}
                margin={{top: 10, left: -20}}>
            >
                <XAxis 
                    dataKey={props.xAxis_dataKey}
                    tick={{fontSize: 14}}
                />
                <YAxis
                    tick={{fontSize: 14}}
                />
                <CartesianGrid strokeDasharray='6 6'/>
                <Tooltip/>
                <Line
                    name={props.line_name}
                    type='monotone'
                    strokeWidth={3}
                    dataKey={props.line_dataKey}
                    stroke={props.line_color}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Graph;