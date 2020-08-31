maltaF('io.js')

importScripts('utils.js');

self.onmessage = function (data) {
    var d = decode(data)
    console.log('decoded', d)
    self.postMessage(
        encode({salute: `Hello ${d.name}`})
    )
}
self.onerror = function (e) {
    console.log('Error')
    console.log(e)
}