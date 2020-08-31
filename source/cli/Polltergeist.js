maltaF('io.js')

function Polltergeist(config) {
    this.config = config;
}
Polltergeist.prototype.start = function () {
    console.log('let`s start there');
};

Polltergeist.prototype.io = io
