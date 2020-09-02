var Polltergeist = (function () {
    maltaF('utils.js')
    maltaF('io.js')


    var webWorker = new Worker('js/polltergeist/ww.js');



    function Polltergeist(config, handler) {
        var self = this;
        this.config = config;
        // this.handler = handler;
        webWorker.onmessage = handler
        // this.init()
    }
    Polltergeist.prototype.synch = function (channel, topics) {
        webWorker.postMessage(encode({
            type: 'synch',
            channel: channel,
            topics: topics
        }));
    }
    Polltergeist.prototype.init = function () {
        // webWorker.onmessage = this.handler
    };
    Polltergeist.prototype.requestPerson = function (n) {
        webWorker.postMessage(encode({number: n}));
        
    };
    Polltergeist.prototype.subscribe = function (channel, topic, handler) {
        
    };
    Polltergeist.prototype.io = io;

    return Polltergeist
})();