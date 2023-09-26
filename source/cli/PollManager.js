var PollManager = (function () {
    var polls = {},
        restToken = '';
    return {
        add: function (channel, token, topics) {
            // if the channel does not exists, create it, with no topics
            if (!(channel in polls)) polls[channel] = {
                restToken: restToken,
                token: token,
                topics: {}
            };
            // fill it with given topics
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
        updateDigests: function (d) {
            var digest = JSON.parse(d.data);
            for (var i = 0, l = digest.data.length, dgst; i < l; i++) {
                dgst = digest.data[i];
                polls[dgst.channel].topics[dgst.topic].digest = dgst.digest;
            }
        }, 
        setRestToken: function (token) {
            restToken = token;
        },
        getAll : function () {return polls;}
    }; 
})();