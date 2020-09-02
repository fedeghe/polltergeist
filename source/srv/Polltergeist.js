const config = require('./config.json')

const debug = true;
const error = true;

const express = require('express'),
    cors = require('cors'),
    app = express(),
    http = require('http'),
    bodyParser = require("body-parser"),  
    port = maltaV('port');

const log = (...args) => debug && console.log(...args)
const err = (...args) => error && console.log('[ERROR]', ...args)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handleRequest = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    const { body} = req;
    // log(body)
    // res.send(JSON.stringify({name: 'Fede', data: body})).end();


    /// for the moemnt is ok the wrong ep
    http.get(
        'http://127.0.0.1:3002/person/1',
        xres => {
            let rawData = '';
            xres.on('data', (chunk) => { rawData += chunk; });
            xres.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    log('REST is replying: ', {
                        ...parsedData,
                        data: body
                    });
                    
                    res.send(JSON.stringify({
                        ...parsedData,
                        data: body
                    })).end();
                    // console.log({name: 'Fede', data: body})
                    

                } catch (e) {
                    err(e.message);
                }
            });
        }
    );
    req.on('error', e => {
        log('ERROR: ' + e.message);
    });
    // next();
};


app.post('/', handleRequest)
app.listen(port, () => {
    log(`Example app listening @ http://localhost:${port}`)
});