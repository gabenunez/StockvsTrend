const express = require('express');
const googleTrends = require('google-trends-api');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {

    const getTrendsData = (dateNumber, dateType) => {
        googleTrends.interestOverTime({
            keyword: data.searchTerm, 
            startTime: moment().subtract(dateNumber, dateType).toDate()
        })
        .then(function(results){
            res.send({results});
        })
        .catch(function(err){
            console.error('Oh no there was an error', err);
        });
    }

    const data = req.query;

    switch (data.dateRange) {
        case '1 Month':
            getTrendsData(1, 'm');
            break;
        case '3 Months':
            getTrendsData(3, 'm');
            break;
        case '6 Months':
            getTrendsData(6, 'm');
            break;
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

app.listen(port, () => console.log(`Listening on port ${port}`));