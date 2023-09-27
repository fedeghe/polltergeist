var Polltergeist = (function () {
    var instance;
    /*
    [Malta] PolltergeistClient.js
    */
    var PolltergeistClient = (function () {
        /*
        [Malta] utils.js
        */
        function encode(d) { return JSON.stringify(d);}
        function decode(d) { return d ? JSON.parse(d) : {};}
        function decodeData(d) { return d && 'data' in d ? JSON.parse(d.data) : {};}
        /*
        [Malta] io.js
        */
        // IO
        var io = (function () {
            function beJson(x){x.setRequestHeader('Content-type', 'application/json; charset=utf-8');}
            function getXHR(options) {
                var xhr = new XMLHttpRequest();
                if (options && 'on' in options) {
                    'readystatechange' in options.on
                         && xhr.addEventListener('readystatechange', options.on.readystatechange);
                    'loadstart' in options.on
                         && xhr.addEventListener('loadstart', options.on.loadstart);
                    'load' in options.on
                         && xhr.addEventListener('load', options.on.load);
                    'loadend' in options.on
                         && xhr.addEventListener('loadend', options.on.loadend);
                    'progress' in options.on
                         && xhr.addEventListener('progress', options.on.progress);
                    'error' in options.on
                         && xhr.addEventListener('error', options.on.error);
                    'abort' in options.on
                         && xhr.addEventListener('abort', options.on.abort);
                    'timeout' in options.on
                         && xhr.addEventListener('timeout', options.on.timeout);
                }
                return xhr;
            }
            function setHeaders(xhr, options) {
                if (options && 'headers' in options) {
                    for (var k in options.headers) {
                        options.headers.hasOwnProperty(k)
                        && xhr.setRequestHeaders(k, options.headers[i]);
                    }
                }
                return xhr;
            }
            return {
                get: function (what, options) {
                    var xhr = getXHR(options);
                    xhr.open('GET', what, false);
                    beJson(xhr);
                    xhr = setHeaders(xhr, options);
                    xhr.send();
                },
                post: function (where, payload, options) {
                    var xhr = getXHR(options);
                    xhr.open('POST', where, false);
                    beJson(xhr);
                    xhr = setHeaders(xhr, options);
                    xhr.send(JSON.stringify(payload));
                },
                delete: function (what, options) {
                    var xhr = getXHR(options);
                    xhr.open('DELETE', what, false);
                    xhr = setHeaders(xhr, options);
                    xhr.send();
                },
                put: function (where, payload, options) {
                    var xhr = getXHR(options);
                    xhr.open('PUT', where, false);
                    beJson(xhr);
                    xhr = setHeaders(xhr, options);
                    xhr.send(JSON.stringify(payload));
                },
                head: function (what, options) {
                    var xhr = getXHR(options);
                    xhr.open('HEAD', what, false);
                    beJson(xhr);
                    xhr = setHeaders(xhr, options);
                    xhr.send();
                },
                patch: function (where, payload, options) {
                    var xhr = getXHR(options);
                    xhr.open('PATCH', where, false);
                    beJson(xhr);
                    xhr = setHeaders(xhr, options);
                    xhr.send(JSON.stringify(payload));
                },
                connect: function () {},
                options: function () {},
                trace: function () {}
            };
        })();
    
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
            
            'token' in self.config && post({ type: 'setRestToken', token : self.config.token}); 
    
            // self.config.pollingInterval
            // && post({ type: 'setPollingInterval', interval : self.config.pollingInterval});
        }
        DataManager.prototype.handleData = function (data) {
            console.log({handleData: data, time: +new Date})
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
            post({
                type: 'synch',
                channel:channel,
                token: config.token,
                topics: config.topics
            });
    
            // config.pollingInterval
            post({
                type: 'setPollingInterval',
                pollingInterval : config.pollingInterval,
                channel: channel
            });
        };
        DataManager.prototype.io = io;
    
        return DataManager;
    })();
    

    return {
        getInstance: function (config, handlers) {
            if (instance) return instance;
            instance = new PolltergeistClient(config, handlers);
            return instance;
        }
    };
})();
(typeof exports === 'object') && (module.exports = Polltergeist);