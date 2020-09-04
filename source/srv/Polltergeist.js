const config = require('./config.json')

const debug = true;
const error = true;

const express = require('express'),
    cors = require('cors'),
    xxhashjs = require("xxhashjs"),
    app = express(),
    http = require('http'),
    https = require('https'),
    bodyParser = require("body-parser"),  
    port = maltaV('server.port');

const log = (...args) => debug && console.log(...args)
const err = (...args) => error && console.log('[ERROR]', ...args)

const digest = json => 
    xxhashjs.h64(0xABCD)
    .update(JSON.stringify(json))
    .digest().toString(16)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handleRequest = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { body } = req;
    const all = Object.keys(body).reduce((acc, channel) => {
        const {token, topics} = body[channel];

        // the channel must be in the config
        if (
            channel in config        
        ) {
            // and the token should match
            // otherwise a special handler will be used 
            // to let the cli know
            const tokenValid = token === config[channel].token
            
            return acc.concat(Object.keys(topics).reduce((tAcc, topic) => {
                // the topic should be listed in the channel config
                if (
                    topic in config[channel].topics
                ) {
                    
                    let ep = config[channel].topics[topic].endpoint;
                    const proto = ep.match(/^https.*/) ? https : http,
                        params = config[channel].topics[topic].params,
                        clientDigest = body[channel].topics[topic].digest;
                    // if the config expects parameters
                    // must be in the body 
                    // and must be replaced in the ep
                    if (params && params.length) {
                        // replace all params in the enpoint
                        params.filter(
                            param =>
                                body[channel].topics[topic].params
                                &&
                                body[channel].topics[topic].params[param]
                        ).forEach(param => {
                            ep = ep.replace(`:${param}`, body[channel].topics[topic].params[param])
                        })

                        // return a promise that solves in the xhr responseHandler in case of valid token,
                        // or solve straigth with empty payload allowing the cli to be aware
                        tAcc.push(
                            tokenValid ?        
                                new Promise((solve, reject) => {
                                    try {
                                        proto.get(
                                            ep,
                                            {headers: {
                                                Authorization: body[channel].restToken
                                            }},
                                            xres => {
                                                let rawData = '';
                                                xres.on('data', (chunk) => { rawData += chunk; });
                                                xres.on('end', () => {
                                                    try {
                                                        const parsedData = JSON.parse(rawData);
                                                        const dataDigest = digest(parsedData)
                                                        
                                                        solve(clientDigest === dataDigest ? {
                                                            channel,
                                                            topic,
                                                            digest: clientDigest,
                                                            payload : {},
                                                            handler: '___NO_UPDATES___'
                                                        } : {
                                                            channel,
                                                            topic,
                                                            digest: dataDigest,
                                                            payload : {...parsedData},
                                                            handler: body[channel].topics[topic].handler
                                                        });
                                                    } catch (e) {
                                                        err(e.message);
                                                    }
                                                });
                                            }
                                        )
                                    } catch(e) {
                                        console.log(e)
                                    }
                                })
                                :
                                Promise.solve({
                                    channel,
                                    topic,
                                    digest: clientDigest,
                                    payload : {},
                                    handler: '___INVALID_TOKEN___'
                                })
                        )
                    }
                }
                return tAcc
            }, []))
        }
        return acc
    }, [])


    Promise.all(all)
        .then(results => 
            console.log(results) || res.send(JSON.stringify(results)).end()
        );

    req.on('error', e => {
        log('ERROR: ' + e.message);
    });
};


app.post('/', handleRequest)
app.listen(port, () => {
    log(`Example app listening @ http://localhost:${port}`)
});