function encode(d) {
    return JSON.stringify(d)
}
function decode(d) {
    return d ? JSON.parse(d) : {}
}
function decodeData(d) {
    return d && 'data' in d ? JSON.parse(d.data) : {}
}