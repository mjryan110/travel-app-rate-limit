const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const dotenv = require('dotenv');
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
const GEONAMES_USER_NAME = process.env.GEONAMES_USER_NAME
const geonames_baseURL = 'api.geonames.org/search?'
console.log(`Your API key is ${process.env.GEONAMES_USER_NAME}`);

// Post Route
app.post('/api', async function(req, res) {
    city = req.body.city;
    console.log(`You entered: ${city}`);
    const geonamesINFO = `${geonames_baseURL}q=${city}&username=${GEONAMES_USER_NAME}&maxRows=1&lang=en`

    const response = await fetch(geonamesINFO)
    const city_lat_long = await response.json()
    console.log(city_lat_long)
    res.send(city_lat_long)
})



//// Weatherbit API ////
//const weatherbit_apiKey = process.env.WEATHERBIT_API_KEY
//const weatherbit_baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
//console.log(`Your API key is ${process.env.WEATHERBIT_API_KEY}`);

//// Pixabay API //// 
//const pixabay_apiKey = process.env.PIXABAY_API_KEY
//const pixabay_baseURL = 'https://pixabay.com/api/?'
//console.log(`Your API key is ${process.env.PIXABAY_API_KEY}`);
