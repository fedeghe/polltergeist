var Polltergeist = (function () {
    maltaF('utils.js')


    var webWorker = new Worker('js/polltergeist/ww.js');
    webWorker.postMessage(encode({name: 'Federico'}));
    webWorker.onmessage = function (d) {
        console.log('back', decode(d));
    };


    function Polltergeist(config) {
        this.config = config;
    }
    Polltergeist.prototype.start = function () {
        console.log('let`s start there');
    };
    Polltergeist.prototype.subscribe = function (channel, topic, handler) {
        
    };

    return Polltergeist
})();