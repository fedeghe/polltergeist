var PolltergeistClient = (function () {
    maltaF('utils.js')
    maltaF('io.js')

    var webWorker = new Worker('./polltergeist/ww.js');
    function post(o){ webWorker.postMessage(encode(o)); }
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
            self.handleData(decodeData(e));
        };
        
        post({type: 'setPolltergeistServerUrl', url : self.config.url});
        
        post({ type: 'setRestToken', token : self.config.token}); 

        self.config.pollingInterval
        && post({ type: 'setPollingInterval', interval : self.config.pollingInterval});
    }
    DataManager.prototype.handleData = function (data) {
        var i = -1,
            l = data.length,
            handlerName;
        while (++i < l) {
            handlerName = data[i].handler;
            handlerName !== '___NO_UPDATES___'
                && handlerName in this.handlers
                && this.handlers[handlerName](data[i]);
        }
        post({ type: 'updateClientDigests', data: data });
        
    };
    DataManager.prototype.synch = function (channel, request) {
        post({
            type: 'synch',
            channel: channel,
            token: request.token,
            topics: request.topics
        });
    };
    DataManager.prototype.io = io;

    return DataManager;
})();