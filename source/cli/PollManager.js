var PollManager = (function () {
    var polls = {};
    return {
        add: function (channel, topics) {
            console.log('adding', channel, topics)
            if (!(channel in polls)) polls[channel] = {};
            for (var topic in topics) {
                if (!(topic in polls[channel])) {
                    polls[channel][topic] = {
                        params: topics[topic].params,
                        consume: topics[topic].consume
                    };
                }
            }
        },
        getAll : function () {return polls;}
    }; 
})();