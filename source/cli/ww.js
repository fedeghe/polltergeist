maltaF('io.js')
maltaF('PollManager.js')

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


var loop = setInterval(poll, maltaV('client.pollingInterval'))




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