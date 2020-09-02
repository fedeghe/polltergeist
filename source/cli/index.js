var Polltergeist = (function () {
    var instance;
    maltaF('Polltergeist.js')
    

    return {
        getInstance: function (config, handler) {
            if (instance) return instance;
            instance = new Polltergeist(config, handler)
            return instance;
        }
    };
})();