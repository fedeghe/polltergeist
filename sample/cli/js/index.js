console.log("༺ polltergeist 0.0.0 ༻");
console.log('powered by ᚗᚌ');

var person = document.getElementById('person'),
    car = document.getElementById('car'),
    p = Polltergeist.getInstance({
            url: "http://127.0.0.1:5034",
            pollingInterval: 1000
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