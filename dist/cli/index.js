var Polltergeist = (function () {
    var instance;
    /*
    [Malta] Polltergeist.js
    */
    var Polltergeist = (function () {
        /*
        [Malta] utils.js
        */
        function encode(d) {
            return JSON.stringify(d)
        }
        function decode(d) {
            return JSON.parse(d.data)
        }
    
    
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
    

    return {
        getInstance: function (config) {
            if (instance) return instance;
            instance = new Polltergeist(config)
            return instance;
        }
    };
})();