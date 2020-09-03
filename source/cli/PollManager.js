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