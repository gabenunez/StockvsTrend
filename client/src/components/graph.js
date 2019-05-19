import React from 'react';
import { formatMoney } from 'accounting';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const Graph = props => {
  if (
    props.stockIsInvalid ||
    props.trendIsInvalid ||
    props.trendApiError ||
    props.stockApiError
  ) {
    return (
      <div className="graph-error">
        <h4>
          {props.stockIsInvalid ? 'Invalid Stock Ticker' : ''}
          {props.trendIsInvalid ? 'No Data Available' : ''}
          {props.trendApiError || props.stockApiError ? 'Error' : ''}
        </h4>
        <h5>
          {props.stockIsInvalid ? 'Perhaps you mistyped it?' : ''}
          {props.trendIsInvalid ? 'Maybe shorten your search phrase?' : ''}
          {props.trendApiError || props.stockApiError
            ? props.trendApiError || props.stockApiError
            : ''}
        </h5>
      </div>
    );
  }

  if (!props.list) {
    // If no data is available, show css loader.
    return (
      <div className="cssload-container">
        <div className="cssload-loading">
          <i />
          <i />
        </div>
      </div>
    );
  }

  const format_graph_data = graphData => {
    let formattedGraphData = graphData;

    switch (props.line_name) {
      case 'Stock':
        formattedGraphData = formatMoney(graphData);
        break;
      case 'Google Trend':
        formattedGraphData = `${graphData}%`;
        break;
      default:
        break;
    }

    return formattedGraphData;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={props.list} margin={{ top: 10, left: 14, right: 14 }}>
        >
        <XAxis dataKey={props.xAxis_dataKey} tick={{ fontSize: 14 }} />
        <YAxis
          tick={{ fontSize: 14 }}
          tickFormatter={value => format_graph_data(value)}
        />
        <Tooltip formatter={value => format_graph_data(value)} />>
        <Line
          name={props.line_name}
          type="monotone"
          strokeWidth={3}
          dataKey={props.line_dataKey}
          stroke={props.line_color}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
