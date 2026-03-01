(function (){
    console.log("༺ polltergeist maltaV('PACKAGE.version') ༻");
    console.log('powered by ᚗᚌ');

    var person = document.getElementById('person'),
        car = document.getElementById('car'),
        input = document.getElementById('input'),
        update = document.getElementById('update'),
        carSelect = document.getElementById('carSelect'),
        selectedCarId = 1,
        patchPerson = function (payload) {
            p.io.patch('http://127.0.0.1:3002/person/1', payload, {
                on: {
                    readystatechange: function () {
                        if (this.readyState === 4 && this.status >= 400) {
                            console.log('person patch failed', this.status, this.responseText);
                        }
                    }
                }
            });
        },
        handlers = {
            handler1: function(data) {
                person.innerHTML = input.value = data.payload.name;
                if ('selectedCarId' in data.payload) {
                    selectedCarId = `${data.payload.selectedCarId}`;
                    carSelect.value = selectedCarId;
                }
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
                params: {id: function (){return selectedCarId;}},
                handler: 'handler2'
            }
        },
        live: true
    });

    carSelect.addEventListener('change', function (e) {
        selectedCarId = e.target.value;
        patchPerson({selectedCarId: +selectedCarId});
    });
    update.addEventListener('click', function () {
        patchPerson({name: input.value});
    }, false);

})();
