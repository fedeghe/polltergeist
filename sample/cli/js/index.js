console.log("༺ polltergeist 0.0.0 ༻");
console.log('powered by ᚗᚌ');

var person = document.getElementById('person'),
    car = document.getElementById('car'),
    input = document.getElementById('input'),
    update = document.getElementById('update'),
    p = Polltergeist.getInstance({
            url: "http://127.0.0.1:5034",
            token: "federico.ghedina"
            //, pollingInterval: 1000 // DEFAUlT is 3000
        }, {
            handler1: function(data) {
                person.innerHTML = input.value = data.payload.name
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

// on the update hit straight the update endpoing 
// and check it coming back on all clis after at most a interval is passed by
update.addEventListener('click', function () {
    p.io.put('http://127.0.0.1:3002/person/1', {name: input.value}, {
        on: {
            readystatechange: function () {
                if (this.readyState == 4 && this.responseText) {
                    console.log('done', this)
                }
            }
        }
    })
}, false)