const express = require('express');
const googleTrends = require('google-trends-api');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {    

    googleTrends.interestOverTime({keyword: 'google'})
    .then(function(results){
        res.send({results});
    })
    .catch(function(err){
        console.error('Oh no there was an error', err);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));