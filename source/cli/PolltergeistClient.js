var PolltergeistClient = (function () {
    maltaF('utils.js')
    maltaF('io.js')

    var webWorker = new Worker('./polltergeist/ww.js');

    function DataManager(config, handlers) {
        var self = this;
        this.config = config;
        this.handlers = {
            // allow the client script to override that
            INVALID_TOKEN: function (data) {
                console.log('Invalid token');
                console.log(data);
            } ,
            
            ...handlers,
            // this one cannot be overridden ,cause at least the first
            // time the clientDigest needs to be updated
            ___NO_UPDATES___: function (data) {
                console.log('Nothing to update');
            }
        };
        webWorker.onmessage = function (e) {
            self.handleData(JSON.parse(e.data));
        };
        
        webWorker.postMessage(encode({
            type: 'setPolltergeistServerUrl',
            url : self.config.url
        }));
        
        webWorker.postMessage(encode({
            type: 'setRestToken',
            token : self.config.token
        })); 

        self.config.pollingInterval
        && webWorker.postMessage(encode({
            type: 'setPollingInterval',
            interval : self.config.pollingInterval
        }));
    }
    DataManager.prototype.handleData = function (data) {
        var handlers = this.handlers,
            i = -1,
            l = data.length,
            handlerName;
        while (++i < l) {
            handlerName = data[i].handler;
            handlerName !== '___NO_UPDATES___'
                && handlerName in handlers
                && handlers[handlerName](data[i]);
        }
        webWorker.postMessage(encode({
            type: 'updateClientDigests',
            data: data
        }));
        
    };
    DataManager.prototype.synch = function (channel, request) {
        webWorker.postMessage(encode({
            type: 'synch',
            channel: channel,
            token: request.token,
            topics: request.topics
        }));
    };
    DataManager.prototype.io = io;

    return DataManager;
})();