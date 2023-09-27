maltaF('io.js')
maltaF('PollManager.js')
maltaF('utils.js')

var ww = self,
    PolltergeistServerUrl = null,
    // loop = setInterval(poll, maltaV('client.pollingInterval'));
    loops = {},
    pollers = {}


function getPoller(channel) {
    if(channel in pollers) return pollers[channel];
    var polls = PollManager.getAllByChannel(channel);
    pollers[channel] = function () {
        if (!PolltergeistServerUrl) {
            clearInterval(loop);
            throw '[ERROR] No Polltergeist server url set\npass it as `{url:"<url here>" }`\nas first parameter calling `Polltergeist.getInstance`';
        }
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
    return pollers[channel];
}
function resetInterval(channel, interval) {
    channel in loops && 
        clearInterval(loops[channel]);
    var poll = getPoller(channel);
    loops[channel] = setInterval(poll, interval);
}

ww.onmessage = function (data) {
    var payload = decodeData(data),
        poll;
    switch (payload.type) {
        case 'synch':
            PollManager.add(
                payload.channel,
                payload.token,
                payload.topics
            );
            // retrieve first data asap
            poll = getPoller(payload.channel)
            poll();
            break;
        case 'setPolltergeistServerUrl':
            PolltergeistServerUrl = payload.url;
            break;
        case 'updateClientDigests':
            PollManager.updateDigests(data);
            break;
        case 'setPollingInterval':
            resetInterval(
                payload.channel,
                payload.pollingInterval
            );
            break;
        case 'setRestToken':
            PollManager.setRestToken(payload.token);
            break;
    }
};
self.onerror = function (e) {
    console.log('Error');
    console.log(e);
};