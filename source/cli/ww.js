maltaF('io.js')
maltaF('PollManager.js')

importScripts('utils.js');
var ww = self

var loop = setInterval(function () {
    var polls = PollManager.getAll();
    io.post('http://127.0.0.1:5034', polls, {
        on: {
            readystatechange: function () {
                if (this.readyState == 4 && this.responseText) {
                    ww.postMessage(this.responseText)
                    console.log('DATA', this.responseText)
                }
            }
        }
    })
}, 3000)

ww.onmessage = function (data) {
    var d = decodeData(data)
    switch (d.type) {
        case 'synch':
            PollManager.add(
                d.channel,
                d.topics
            );
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