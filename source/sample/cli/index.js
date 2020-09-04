console.log("༺ polltergeist maltaV('PACKAGE.version') ༻");
console.log('powered by ᚗᚌ');

var person = document.getElementById('person'),
    car = document.getElementById('car'),
    p = Polltergeist.getInstance({
            url: "maltaV('server.endpoint')",
            token: "federico.ghedina"
            //, pollingInterval: 1000 // DEFAUlT is 3000
        }, {
            handler1: function(data) {
                person.innerHTML = data.payload.name
            },
            handler2: function(data) {
                car.innerHTML = data.payload.model
            }
        }
    );

p.synch('channel1', {
    token: 'AAABBB111222',
    topics: {
        persons: {
            params: {id: 1},
            handler: 'handler1'
        },
    }
});

p.synch('channel2', {
    token: 'CCCDDD333444',
    topics: {
        cars: {
            params: {id: 1},
            handler: 'handler2'
        }
    }
});