console.log("༺ polltergeist maltaV('PACKAGE.version') ༻");
console.log('powered by ᚗᚌ');

console.log(new Date);


var p = Polltergeist.getInstance({
        url: "maltaV('server.endpoint')"
    }, {
        handler1: function(d) {
            // console.log('cli ', d)
            person.innerHTML = d.payload.name
        },
        handler2: function(d) {
            // console.log('cli ', d)
            car.innerHTML = d.payload.model
        }
    });

var person = document.getElementById('person'),
    car = document.getElementById('car');

p.synch('channel1', {
    token: 'AAABBB111222',
    topics: {
        persons: {
            params: {id: 1},
            handler: 'handler1'
        },
    }
})
p.synch('channel2', {
    token: 'CCCDDD333444',
    topics: {
        cars: {
            params: {id: 1},
            handler: 'handler2'
        }
    }
})



// p.requestPerson(1)
// p.requestPerson(2)
// p.requestPerson(2, function (d) {
//     console.log(+new Date)
//     console.log('got back cli2: ', +new Date, d)
//     console.log('got back cli data2: ', +new Date, d.data)
// })
// p.io.head('http://127.0.0.1:3002/person/1');
// p.io.head('http://127.0.0.1:3002/persons');

// p.io.put('http://127.0.0.1:3002/person/2', {
//     name: "Gabriele Ghedina",
// })

// p.io.post('http://127.0.0.1:3002/persons', [{
//     name: "anthony"
// },{
//     name: "jeff"
// }])

// p.io.get('http://127.0.0.1:3002/person/1', {
//     on: {
//         readystatechange: function () {
//             // console.log(this)
//             // console.log(this.status)
//             if (this.readyState === 4 && this.responseText) {
//                 console.log(JSON.parse(this.responseText))
//                 // del();
//             }
//             console.log('============')
//         }
//     }
// })

// p.io.delete('http://127.0.0.1:3002/person/2', {
//     on: {
//         readystatechange: function () {
//             // console.log(this)
//             // console.log(this.status)
//             if (this.readyState === 4 && this.responseText) {
//                 console.log(JSON.parse(this.responseText))
//             }
//             console.log('============')
//         }
//     }
// })
