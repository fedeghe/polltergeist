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
/*
[Malta] PollManager.js
*/
var PollManager = (function () {
    var polls = {};
    return {
        add: function (channel, token, topics) {
            if (!(channel in polls)) polls[channel] = {
                token: token,
                topics: {}
            };
            for (var topic in topics) {
                if (!(topic in polls[channel].topics)) {
                    polls[channel].topics[topic] = {
                        params: topics[topic].params,
                        handler: topics[topic].handler,
                        digest: ''
                    };
                }
            }
        },
        updateDigests: function (d){
            var digest = JSON.parse(d.data)
            for (var i = 0, l = digest.data.length, dgst; i < l; i++) {
                dgst= digest.data[i]
                polls[dgst.channel].topics[dgst.topic].digest = dgst.digest;
            }
        }, 
        getAll : function () {return polls;}
    }; 
})();

importScripts('utils.js');


var ww = self

var PolltergeistServerUrl = null

function poll() {
    if (!PolltergeistServerUrl) {
        clearInterval(loop)
        throw '[ERROR] No Polltergeist server url set\npass it as `{url:"<url here>" }`\nas first parameter calling `Polltergeist.getInstance`';
    }
    var polls = PollManager.getAll();
    io.post(PolltergeistServerUrl, polls, {
        on: {
            readystatechange: function () {
                if (this.readyState == 4 && this.responseText) {
                    ww.postMessage(this.responseText)
                }
            }
        }
    })
}


var loop = setInterval(poll, 3000)




ww.onmessage = function (data) {
    var request = decodeData(data)
    switch (request.type) {
        case 'synch':
            PollManager.add(
                request.channel,
                request.token,
                request.topics
            );
            break;
        case 'setPolltergeistServerUrl':
            PolltergeistServerUrl = request.url;
            break;
        case 'updateClientDigests': 
            PollManager.updateDigests(data);
            break;

    }

    
    // io.post('http://127.0.0.1:5034', d, {
    //     on: {
    //         readystatechange: function () {
    //             if (this.readyState == 4 && this.responseText)
    //                 console.log('back to the ww', +new Date, this.responseText)
    //                 ww.postMessage(
    //                     decode(this.responseText)
    //                 )
    //             }
    //         }
    //     }
    // );
}
self.onerror = function (e) {
    console.log('Error')
    console.log(e)
}



// poll();