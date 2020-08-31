var Polltergeist = (function () {
    var instance;
    maltaF('Polltergeist.js')
    return {
        getInstance: function (config) {
            if (instance) return instance;
            instance = new Polltergeist(config)
            return instance;
        }
    };
})();