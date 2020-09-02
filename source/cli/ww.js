maltaF('io.js')

importScripts('utils.js');
var ww = self

ww.onmessage = function (data) {
    var d = decodeData(data)
    // console.log('decoded', d);
    io.post('http://127.0.0.1:5034', d, {
        on: {
            readystatechange: function () {
                if (this.readyState == 4 && this.responseText)
                    console.log('back to the ww', +new Date, this.responseText)
                    ww.postMessage(
                        decode(this.responseText)
                    )
                }
            }
        }
    );
}
self.onerror = function (e) {
    console.log('Error')
    console.log(e)
}