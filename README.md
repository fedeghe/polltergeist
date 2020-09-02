# ༺ P o l l t e r g e i s t ༻
---
![Polltergeist](https://github.com/fedeghe/polltergeist/blob/master/sample/cli/media/poltergeist_eventbrite.jpg?raw=true)

---

#### For the moment this is the raw plan / wish list to create a **polling** based version of [synchazard](https://github.com/fedeghe/synchazard)  

---
Server side
- [ ] easily create topics, which aggregate and expose one or more endpoint
- [ ] manage subscription to topics:
    - [ ] unsubscribe clients after 3rd missing heart-beat
    - [ ] unsubscribe hard-beating clients (frequency cutoff value based)

Client side
- [ ] automatically register the client with unique ideintifier (saved in storage or cookie, which gets deprecated after the 3rd missing _heart-beat_), given the client provides one or more valid `{topic:token}`
- [ ] every communication is handled by a _webworker_ which is the only one that receives/sends information to the server and the client handlers, thus plays like a _proxy_
- [x] the webworker internally uses a private xhr client for the communication
- [ ] clients should easily create handlers per topic to consume _heart-beat-responses_
- [ ] _heart-beat-responses_ will contain informations from all endpoints included in all subscribed topics
- [ ] each _heart-beat-request_ must be authenticated using all needed `{topic: token}` pairs  

༺ ᚗᚌ ༻



---
### Basic flow playground
run `yarn start:server` to start the pollteregeist node server  
run `yarn buildev`, visit _http://127.0.0.1:3001_, check console 

