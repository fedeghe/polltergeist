var Polltergeist = (function () {
    var instance;
    maltaF('PolltergeistClient.js')
    

    return {
        getInstance: function (config, handler) {
            if (instance) return instance;
            instance = new PolltergeistClient(config, handler)
            return instance;
        }
    };
})();