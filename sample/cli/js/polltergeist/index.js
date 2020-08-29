var Polltergeist = (function () {
    var instance;
    /*
    [Malta] Polltergeist.js
    */
    function Polltergeist(config) {
        this.config = config;
    }
    Polltergeist.prototype.start = function () {
        console.log('let`s start there');
    };
    return {
        getInstance: function (config) {
            if (instance) return instance;
            instance = new Polltergeist(config)
            return instance
        }
    }
})();