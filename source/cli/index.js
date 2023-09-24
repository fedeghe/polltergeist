var Polltergeist = (function () {
    var instance;
    maltaF('PolltergeistClient.js')
    

    return {
        getInstance: function (config, handlers) {
            if (instance) return instance;
            instance = new PolltergeistClient(config, handlers);
            return instance;
        }
    };
})();
(typeof exports === 'object') && (module.exports = Polltergeist);