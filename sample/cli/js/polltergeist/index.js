var Polltergeist = (function () {
    var instance;
    /*
    [Malta] Polltergeist.js
    */
    /*
    [Malta] io.js
    */
    // IO
    var io = (function () {
        function getXHR(options) {
            var xhr = new XMLHttpRequest();
            if (options && 'on' in options) {
                if ('readystatechange' in options.on) xhr.onreadystatechange = options.on.readystatechange;
                if ('load' in options.on) xhr.onload = options.on.load;
                if ('progress' in options.on) xhr.onprogress = options.on.progress;
                if ('error' in options.on) xhr.onerror = options.on.error;
                if ('abort' in options.on) xhr.onabort = options.on.abort;
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
                xhr.open('GET', what, true);
                xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                xhr = setHeaders(xhr, options);
                xhr.send();
            },
            post: function (where, payload, options) {
                var xhr = getXHR(options);
                xhr.open('POST', where, true);
                xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                xhr = setHeaders(xhr, options);
                xhr.send(JSON.stringify(payload));
            },
            delete: function (what, options) {
                var xhr = getXHR(options);
                xhr.open('DELETE', what, true);
                xhr = setHeaders(xhr, options);
                xhr.send();
            },
            put: function (where, payload, options) {
                var xhr = getXHR(options);
                xhr.open('PUT', where, true);
                xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                xhr = setHeaders(xhr, options);
                xhr.send(JSON.stringify(payload));
            },
            head: function (what, options) {
                var xhr = getXHR(options);
                xhr.open('HEAD', what, true);
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
    
    function Polltergeist(config) {
        this.config = config;
    }
    Polltergeist.prototype.start = function () {
        console.log('let`s start there');
    };
    
    Polltergeist.prototype.io = io
    
    return {
        getInstance: function (config) {
            if (instance) return instance;
            instance = new Polltergeist(config)
            return instance;
        }
    };
})();