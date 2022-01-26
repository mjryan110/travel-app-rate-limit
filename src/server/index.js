const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const redis = require('./redis-client.js')
dotenv.config();

// start up app
const app = express()

//cors
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//Initialize the main project folder
app.use(express.static('dist'))

const port = 8081;

app.listen(port, function () {
    console.log(`Running on localhost: ${port}`)
})

// Get
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    })

//// Geonames API ////
const GEONAMES_USER_NAME = "mjryan110"
const geonames_baseURL = 'http://api.geonames.org/searchJSON?'

// Post Route
app.post('/city', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    const requests = await redis.incr(ip)

    let ttl
    if(requests === 1) {
        await redis.expire(ip, 60)
        ttl = 60
    } else {
        ttl = await redis.ttl(ip)
    }
    
    if(requests > 20) {
        return res.status(503).json({
            response: 'error',
            callsInAMinute: requests,
            ttl
        })
    }

    console.log('Number of requests made so far', requests)

    destcity = req.body.city;
    console.log(`You entered: ${destcity}`);
    const geonamesINFO = `${geonames_baseURL}q=${destcity}&username=${GEONAMES_USER_NAME}&maxRows=1&lang=en`
    //console.log(geonamesINFO)

    const geonamesFetch = await fetch(geonamesINFO)
    const city_lat_long = await geonamesFetch.json()
    //console.log(city_lat_long)
    res.send(city_lat_long)
})