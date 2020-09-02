/*
[Malta] Polltergeist.js
*/
/*
[Malta] Polltergeist.js
*/
var express = require('express'),
    cors = require('cors'),
    app = express(),
    http = require('http'),
    bodyParser = require("body-parser"),  
    port = 5034;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handleRequest = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    const { body: {number} } = req;
    // console.log(req.body)

    // res.send({hi:'federicoG'}).end();
    http.get(
        'http://127.0.0.1:3002/person/'+ number,
        xres => {
            let rawData = '';
            xres.on('data', (chunk) => { rawData += chunk; });
            xres.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log('REST is replying: ', parsedData);
                    res.send(JSON.stringify(parsedData)).end();
                } catch (e) {
                    console.error(e.message);
                }
            });
        }
    );
    req.on('error', e => {
        console.log('ERROR: ' + e.message);
    });
    // next();
};


app.post('/', handleRequest)
app.listen(port, () => {
    console.log(`Example app listening @ http://localhost:${port}`)
})

/*
const router = express.Router();

// function Polltergeist() { }
const handleRequest = (req, res, next) => {
    console.log('request received')
    console.log(req)
    res.setHeader('Content-Type', 'application/json');
    const { body: {number} } = req;
    // console.log(req.body)

    res.send({hi:'federicoG'}).end();
    // http.get(
    //     'http://127.0.0.1:3002/person/'+ number,
    //     xres => {
    //         let rawData = '';
    //         xres.on('data', (chunk) => { rawData += chunk; });
    //         xres.on('end', () => {
    //             try {
    //                 const parsedData = JSON.parse(rawData);
    //                 console.log('REST is replying: ', parsedData);
    //                 res.send(rawData).end();
    //             } catch (e) {
    //                 console.error(e.message);
    //             }
    //         });
    //     }
    // );
    req.on('error', e => {
        console.log('ERROR: ' + e.message);
    });
    // next();
};

// var polltergeist = new Polltergeist()
// app.use(express.json()); 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.all('/', function (req, res, next) {
//     console.log('Accessing the secret section ...')
//     next() // pass control to the next handler
// })
// app.post('/', )

router.post('/',(req, res) => {
    console.log('request received xxx')
});
  
//   app.listen(3000,() => {
//     console.log("Started on PORT 3000");
//   })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
*/