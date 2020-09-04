# ༺ P o l l t e r g e i s t ༻
---
![Polltergeist](https://github.com/fedeghe/polltergeist/blob/master/sample/cli/media/poltergeist_eventbrite.jpg?raw=true)

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

༺ ᚗᚌ ༻