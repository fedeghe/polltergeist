
const debug = true,
    error = true;
const log = (...args) => debug && console.log(...args)
const onErr = (...args) => error && console.log('[ERROR]', ...args)
    
const config = require('./config.json'),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    port = 5034,
    app = express(),
    PolltergeistServer = require('./PolltergeistServer')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handleRequest = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { body } = req,
        sender = r => res.send(JSON.stringify(r)).end();

    PolltergeistServer.requestHandler({body, sender, config, onErr})
        .then(r => {
            console.log({r})
        })
    req.on('error', e => {
        log('ERROR: ' + e.message);
    });
};

app.post('/', handleRequest);
app.listen(port, () => log(`Example app listening @ http://localhost:${port}`));