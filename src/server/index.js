const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const redis = require('./redis-client.js')
const rateLimiter = require('./rate-limiter.js')

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
app.post('/city', rateLimiter({ secondsWindow: 10, allowedHits: 4}), async (req, res) => {
    
    destcity = req.body.city;
    console.log(`You entered: ${destcity}`);
    const geonamesINFO = `${geonames_baseURL}q=${destcity}&username=${GEONAMES_USER_NAME}&maxRows=1&lang=en`
    
    //console.log(geonamesINFO)

    const geonamesFetch = await fetch(geonamesINFO)
    const city_lat_long = await geonamesFetch.json()
    
    //console.log(city_lat_long)
    
    res.send(city_lat_long)

    responseNumber = req.requests;
    ttl = req.ttl;
    console.log('Number of requests made so far: ', responseNumber);
    console.log('TTL = ', ttl);


})