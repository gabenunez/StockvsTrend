const express = require('express');
const googleTrends = require('google-trends-api');
const moment = require('moment');
const axios = require('axios');

const app = express();
const path = require('path');

const port = process.env.PORT || 5000;


app.get('/api/googletrends', (req, res) => {

    const data = req.query;

    const getTrendsData = (dateNumber, dateType) => {
        googleTrends.interestOverTime({
            keyword: data.searchTerm,
            startTime: moment().subtract(dateNumber, dateType).toDate()
        })
        .then(function(results){
            res.send({results});
        })
        .catch(function(error){
            console.log(error.message);
            res.send({error: 'Unable to get data from Google Trends.'});
        });
    }

    switch (data.dateRange) {
        case '1 Year':
            getTrendsData(1, 'y');
            break;
        case '2 Years':
            getTrendsData(2, 'y');
            break;
        case '5 Years':
            getTrendsData(5, 'y');
            break;
        default:
            console.log('Error with timeframe selection.')
            break;
    }
});

app.get('/api/stocks', (req, res) => {

    const data = req.query;

    const getStock = (formatedTimeFrame) => {
        axios.get(`https://api.iextrading.com/1.0/stock/${data.tickerSymbol}/chart/${formatedTimeFrame}`)
        .then((response) => {
            res.send(response.data);
        }).catch((error) => {
            if (error.response.status === 404) {
                res.send([]);
            } else {
                console.log(error.message);
                res.send({error: 'Unable to get data from Stocks API.'});
            }
        });
    }

    switch (data.dateRange) {
        case '1 Year':
            getStock('1y');
            break;
        case '2 Years':
            getStock('2y');
            break;
        case '5 Years':
            getStock('5y');
            break;
        default:
            console.log('Error with timeframe selection.')
            break;
    }
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));