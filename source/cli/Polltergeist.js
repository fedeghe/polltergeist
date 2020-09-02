var Polltergeist = (function () {
    maltaF('utils.js')
    maltaF('io.js')


    var webWorker = new Worker('js/polltergeist/ww.js');



    function Polltergeist(config, handler) {
        var self = this;
        this.config = config;
        // this.handler = handler;
        webWorker.onmessage = function () {handler.apply(self, [].concat(arguments))};
        // this.init()
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