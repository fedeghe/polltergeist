// (function (){
    console.log("༺ polltergeist maltaV('PACKAGE.version') ༻");
    console.log('powered by ᚗᚌ');

    var person = document.getElementById('person'),
        car = document.getElementById('car'),
        input = document.getElementById('input'),
        update = document.getElementById('update'),
        handlers = {
            handler1: function(data) {
                person.innerHTML = input.value = data.payload.name
            },
            handler2: function(data) {
                car.innerHTML = data.payload.model
            }
        },
        p = Polltergeist.getInstance({
                url: "maltaV('server.endpoint')",
                /**
                 * token here is menat to be used only if the 
                 * api server needs a authorization token
                 */
                // token: "federico.ghedina",

                // need to move that on the channel level
                // pollingInterval: 1000 // DEFAUlT is 3000
            }, handlers
        );

    p.synch('channel1', {
        token: 'AAABBB111222',
        pollingInterval: 1E2,
        topics: {
            persons: {
                params: {id: 1},
                handler: 'handler1'
            },
        }
    });

    p.synch('channel2', {
        token: 'CCCDDD333444',
        pollingInterval: 2e3,
        topics: {
            cars: {
                params: {id: 1},
                handler: 'handler2'
            }
        }
    });

    update.addEventListener('click', function () {
        p.io.patch('http://127.0.0.1:3002/person/1', {name: input.value}, {
            on: {
                readystatechange: function () {
                    if (this.readyState == 4 && this.responseText) {
                        console.log('done', this)
                    }
                }
            }
        })
    }, false);

// })();