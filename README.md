# ༺ P o l l t e r g e i s t ༻
---
![Polltergeist](https://github.com/fedeghe/polltergeist/blob/master/source/sample/cli/media/poltergeist_eventbrite.jpg?raw=true)

---

#### For the moment this is the raw plan / wish list to create a **polling** based version of [synchazard](https://github.com/fedeghe/synchazard)  

---
Server side
- [x] easily create channels, which aggregate topics each one expose one endpoint
- [x] each channels has a security token set the client must provide
- [x] manage packed digest updates
- [x] each channel is protected by a special _channel\_token_ the client must provide at subscription time
- [x] the server will use a token the client must provide to access the rest api


Client side
- [x] every communication is handled by a _webworker_ which is the only one that receives/sends information to the server and the client handlers, thus plays like a _proxy_
- [x] the webworker internally uses a private xhr client for the communication
- [x] clients should easily create handlers per topic to consume _responses_
- [x] _responses_ will contain informations from all endpoints included in all subscribed topics
- [x] each _request_ must be authenticated via token (this is a security assumption on the srv, easily tunable)
- [x] the configuration must include: rest endpoint url; mandatory rest endpoint token; optional polling interval


Limitations (TODOS)... at least those I can see
- server can only hit GET endpoint (for the moment)
- this is limited to one rest server


---
### Run basic sample
- run `yarn`
- run `yarn buildev` to generate the sample code, let it run
- run `yarn start:server` to start the pollteregeist node server , let it run
- visit _http://127.0.0.1:3001_, check console 
- change `sample/api/data/persons.json` ...either `source/sample/api/data/persons.json` if you did not stopped the previous live build 

![wtf](https://github.com/fedeghe/polltergeist/blob/master/source/docs/record.gif?raw=true)


---
---
---
### How to integrate in your project

![wtf](https://github.com/fedeghe/polltergeist/blob/master/source/docs/polltergeist.png?raw=true)

In the following discussion I'll have to make some assumptions:

1) You can run a node server (express, hapi, meteor, ...whatever) which allows to handle **POST** requests on a certain port

2) You can run one rest server, allowing crud operations on your data-layer through endpoints  

3) Clients need to be allowed (cors) to hit #1.  


> In the sample runnable here with `yarn buildev` + `yarn start:server` #1 is based on express and #2 is a [bundling plugin](https://www.npmjs.com/package/malta-restify) I wrote some years ago, based on [restify](https://www.npmjs.com/package/restify), but you can obviously use whatever allows #1 and #2.

## ONE #1  
`polltergeist` import the server part, the one you need to integrate on your server (here for simplicity I assume _express_). More specifically import one single function, a request handler getting requestes from the client worker:  
<details>
<summary>simple server side example</summary>

``` js  
const config = require('./config.json'),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    port = 5034,
    app = express(),
    PolltergeistServerHandler = require('polltergeist'),
    onErr = console.error;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handleRequest = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { body } = req,
        sender = r => res.send(
          JSON.stringify(r)
        ).end();

    PolltergeistServerHandler({
        body, sender, config, onErr
    }).then(r => {/* Shut up */});
};
// free to use any path here
// client should anyway be in synch
app.post('/', handleRequest);
app.listen(
    port,
    () => log(`Example app listening on port ${port}`)
);
```
</details>

the only unclear thing here is that `config`

<details>
<summary>but a look at the used content in the example should clarify:</summary>

``` js  
{
    "channel1": {
        "token": "AAABBB111222",
        "topics": {
            "persons": {
                "endpoint": "http://127.0.0.1:3002/person/:id",
                "params": [
                    "id"
                ]
            }
        }
    },
    "channel2": {
        "token": "CCCDDD333444",
        "topics": {
            "cars": {
                "endpoint": "http://127.0.0.1:3002/car/:id",
                "params": [
                    "id"
                ]
            }
        }
    }
}
```
</details>

## TWO #2  
Should be clear what this rest server is responsible for right? 

## THREE #3  
At some point I'll document that decently. To know more please run `yarn buildev` + `yarn start:server` and take a look at the `sample` folder content.

---

<div style="text-align:center">༺ ᚗᚌ ༻</div>


