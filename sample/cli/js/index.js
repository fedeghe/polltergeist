console.log("༺ polltergeist 0.0.0 ༻");
console.log('powered by ᚗᚌ');

console.log(new Date);


var p = Polltergeist.getInstance()
console.log(p)
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
