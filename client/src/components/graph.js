import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = (props) => {

    if(!props.list) {
        return <div>Loading...</div>;
    }

    return (
        <ResponsiveContainer width='100%' height={300}>
            <LineChart 
                data={props.list}
                margin={{top: 5, bottom: 5, left: -30}}>
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
                <Legend />
                <Line
                    name={props.line_name}
                    type='monotone'
                    dataKey={props.line_dataKey}
                    stroke={props.line_color}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Graph;