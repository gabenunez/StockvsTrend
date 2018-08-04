import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = (props) => {

    if(!props.stockList) {
        return <div>Loading...</div>;
    }

    return (
        <ResponsiveContainer width='100%' height={300}>
            <LineChart 
                data={props.stockList}
                margin={{top: 5, bottom: 5}}>
            >
                <XAxis 
                    dataKey='date'
                    tick={{fontSize: 14}}
                />
                <YAxis
                    tick={{fontSize: 14}}
                />
                <CartesianGrid strokeDasharray='6 6'/>
                <Tooltip/>
                <Legend />
                <Line
                    name='Stock Price'
                    type='monotone'
                    dataKey='close' 
                    stroke='#8884d8'
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Graph;