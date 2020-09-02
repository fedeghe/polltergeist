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
    
    
    
        function Polltergeist(config, handler) {
            var self = this;
            this.config = config;
            // this.handler = handler;
            webWorker.onmessage = handler
            // this.init()
        }
        Polltergeist.prototype.synch = function (channel, topics) {
            webWorker.postMessage(encode({
                type: 'synch',
                channel: channel,
                topics: topics
            }));
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
    

    return {
        getInstance: function (config, handler) {
            if (instance) return instance;
            instance = new Polltergeist(config, handler)
            return instance;
        }
    };
})();