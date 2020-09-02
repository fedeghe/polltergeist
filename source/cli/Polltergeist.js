var Polltergeist = (function () {
    maltaF('utils.js')
    maltaF('io.js')


    var webWorker = new Worker('js/polltergeist/ww.js');



    function Polltergeist(config) {
        this.config = config;
        this.init()
    }
    Polltergeist.prototype.init = function () {

    };
    Polltergeist.prototype.requestPerson = function (n, cb) {
        webWorker.postMessage(encode({number: n}));
        webWorker.onmessage = cb
    };
    Polltergeist.prototype.subscribe = function (channel, topic, handler) {
        
    };
    Polltergeist.prototype.io = io;

    return Polltergeist
})();