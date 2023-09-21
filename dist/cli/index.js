var Polltergeist = (function () {
    var instance;
    /*
    [Malta] PolltergeistClient.js
    */
    var PolltergeistClient = (function () {
        /*
        [Malta] utils.js
        */
        function encode(d) {
            return JSON.stringify(d)
        }
        function decode(d) {
            return d ? JSON.parse(d) : {}
        }
        function decodeData(d) {
            return d && 'data' in d ? JSON.parse(d.data) : {}
        }
        /*
        [Malta] io.js
        */
        // IO
        var io = (function () {
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
                        if (options.headers.hasOwnProperty(k))
                            xhr.setRequestHeaders(k, options.headers[i])
                    }
                }
                return xhr;
            }
            return {
                get: function (what, options) {
                    var xhr = getXHR(options);
                    xhr.open('GET', what, false);
                    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                    xhr = setHeaders(xhr, options);
                    xhr.send();
                },
                post: function (where, payload, options) {
                    var xhr = getXHR(options);
                    xhr.open('POST', where, false);
                    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
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
                    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                    xhr = setHeaders(xhr, options);
                    xhr.send(JSON.stringify(payload));
                },
                head: function (what, options) {
                    var xhr = getXHR(options);
                    xhr.open('HEAD', what, false);
                    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                    xhr = setHeaders(xhr, options);
                    xhr.send();
                },
                connect: function () {},
                options: function () {},
                trace: function () {},
                patch: function () {},
            }
        })();
    
        var webWorker = new Worker('js/polltergeist/ww.js');
    
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
                },
            };
            webWorker.onmessage = function (e) {
                self.handleData(JSON.parse(e.data))
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
            
        }
        DataManager.prototype.synch = function (channel, request) {
            webWorker.postMessage(encode({
                type: 'synch',
                channel: channel,
                token: request.token,
                topics: request.topics
            }));
        }
        DataManager.prototype.io = io;
    
        return DataManager
    })();
    

    return {
        getInstance: function (config, handlers) {
            if (instance) return instance;
            instance = new PolltergeistClient(config, handlers)
            return instance;
        }
    };
})();