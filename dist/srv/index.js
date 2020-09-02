/*
[Malta] Polltergeist.js
*/
/*
[Malta] Polltergeist.js
*/

var debug = true;

var express = require('express'),
    cors = require('cors'),
    app = express(),
    http = require('http'),
    bodyParser = require("body-parser"),  
    port = 5034;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handleRequest = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    const { body: {number} } = req;
    // console.log(req.body)

    // res.send({hi:'federicoG'}).end();
    http.get(
        'http://127.0.0.1:3002/person/'+ number,
        xres => {
            let rawData = '';
            xres.on('data', (chunk) => { rawData += chunk; });
            xres.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log('REST is replying: ', parsedData);
                    res.send(JSON.stringify(parsedData)).end();
                } catch (e) {
                    console.error(e.message);
                }
            });
        }
    );
    req.on('error', e => {
        console.log('ERROR: ' + e.message);
    });
    // next();
};


app.post('/', handleRequest)
app.listen(port, () => {
    console.log(`Example app listening @ http://localhost:${port}`)
});