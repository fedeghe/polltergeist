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
        patch: function (where, payload, options) {
            var xhr = getXHR(options);
            xhr.open('PATCH', where, false);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr = setHeaders(xhr, options);
            xhr.send(JSON.stringify(payload));
        },
        connect: function () {},
        options: function () {},
        trace: function () {}
    }
})();