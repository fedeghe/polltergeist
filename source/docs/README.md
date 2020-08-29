maltaF('style.html')
## Polltergeist
---
![Polltergeist](https://github.com/fedeghe/polltergeist/blob/master/sample/media/poltergeist_eventbrite.jpg?raw=true)

---

#### For the moment this is the raw plan / wish list to create a **polling** based version of [synchazard](https://github.com/fedeghe/synchazard)  

---
Server side
- [ ] easily create topics, which aggregate and expose one or more endpoint
- [ ] manage subscription to topics:
    - [ ] unsubscribe clients after 3rd missing heart-beat
    - [ ] unsubscribe hard-beating clients (frequency cutoff value based)

Client side
- [ ] automatically register the client with unique ideintifier (saved in storage or cookie, wich become deprecated after the 3rd missing heart-beat), given the client provides one or more valid {topic:token}
- [ ] every comunication is handled by a webworker which is the only one that receives/sends information to the server and the client handlers
- [ ] clients schould easily create handlers per topic to consume beat-responses
- [ ] beat-responses will contain informations for from each endpoint from each topic
- [ ] each beat-requests must be authenticated using all needed {topic: token} pairs


