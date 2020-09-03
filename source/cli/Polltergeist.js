var Polltergeist = (function () {
    maltaF('utils.js')
    maltaF('io.js')


    var webWorker = new Worker('js/polltergeist/ww.js');



    function Polltergeist(config, handlers) {
        var self = this;
        this.config = config;
        this.handlers = {
            // allow the client script to override that
            ___INVALID_TOKEN___: function (data) {
                console.log('Invalid token');
                console.log(data);
            } ,
            
            ...handlers,
            // this one cannot be overridden ,cause at least the first
            // time the clientDigest needs to be updated
            ___NO_UPDATES___: function (data) {
                console.log('Nothing to update');
            },
        };
        // this.handler = handler;
        webWorker.onmessage = function (e) {
            self.handleData(JSON.parse(e.data))
        } 
        webWorker.postMessage(encode({
            type: 'setPolltergeistServerUrl',
            url : self.config.url
        }));
    }
    Polltergeist.prototype.handleData = function (data) {
        var self = this,
            handlers = this.handlers;

        for (var i = 0, l = data.length, handlerName; i < l; i++) {
            handlerName = data[i].handler
            handlerName in handlers && handlers[handlerName](data[i])
        }
        webWorker.postMessage(encode({
            type: 'updateClientDigests',
            data: data
        }));
        
    }
    Polltergeist.prototype.synch = function (channel, request) {
        webWorker.postMessage(encode({
            type: 'synch',
            channel: channel,
            token: request.token,
            topics: request.topics
        }));
    }
    // Polltergeist.prototype.io = io;

    return Polltergeist
})();