var PolltergeistClient = (function () {
    maltaF('utils.js')
    maltaF('io.js')

    var webWorker = new Worker('./polltergeist/ww.js');
    function post(o){ webWorker.postMessage(encode(o)); }
    function solveTopics(t){
        return Object.entries(t).reduce(
            (acci, [j, topic]) => {
                acci[j] = {
                    handler: topic.handler,
                    params: Object.entries(topic.params).reduce(
                        (accii, [param, val]) => {
                            accii[param] = typeof(val) === 'function' ? val() : val
                            return accii
                        }, {}
                    )
                }
                return acci;
            }, {}
        );
    }
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
        
        'token' in self.config && post({ type: 'setRestToken', token : self.config.token}); 
    }
    DataManager.prototype.handleData = function (data) {
        // console.log({handleData: data, time: +new Date})
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
    DataManager.prototype.synch = function (channel, config) {
        function start() {
            var topics = config.live ? solveTopics(config.topics) : config.topics;
            
            post({
                type: 'synch',
                channel:channel,
                token: config.token,
                topics: topics
            });
        }
        start();
        post({
            type: 'setPollingInterval',
            pollingInterval : config.pollingInterval,
            channel: channel
        });
        if (config.live) {
            setInterval(start, config.pollingInterval);
        }
    };
    DataManager.prototype.io = io;

    return DataManager;
})();