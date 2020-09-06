maltaF('io.js')

maltaF('PollManager.js')

importScripts('utils.js');

var ww = self,
    PolltergeistServerUrl = null,
    loop = setInterval(poll, maltaV('client.pollingInterval'));

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
function resetInterval(interval) {
    clearInterval(loop);
    loop = setInterval(poll, interval);
}

ww.onmessage = function (data) {
    var payload = decodeData(data);
    switch (payload.type) {
        case 'synch':
            PollManager.add(
                payload.channel,
                payload.token,
                payload.topics
            );
            // retrieve first data asap
            poll();
            break;
        case 'setPolltergeistServerUrl':
            PolltergeistServerUrl = payload.url;
            break;
        case 'updateClientDigests':
            PollManager.updateDigests(data);
            break;
        case 'setPollingInterval':
            resetInterval(payload.interval);
            break;
        case 'setRestToken':
            PollManager.setRestToken(payload.token);
            break;
    }
}
self.onerror = function (e) {
    console.log('Error')
    console.log(e)
}