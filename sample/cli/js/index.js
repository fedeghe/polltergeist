console.log("༺ polltergeist 0.0.0 ༻");
console.log('powered by ᚗᚌ');

console.log(new Date);

var Handlers = {}

var p = Polltergeist.getInstance({}, function (e) {
    var data = JSON.parse(e.data)
    console.log('cli')
    console.log(data)
    Handlers[data.data.channel1.perzon.consume](data)
})

var person = document.getElementById('person');

p.synch('channel1', {
    perzon: {
        params: {id: 1},
        consume: 'handler1'
    }
})

Handlers.handler1 = function(d) {
    person.innerHTML = d.name
}

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
