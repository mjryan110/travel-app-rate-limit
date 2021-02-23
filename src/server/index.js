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
const geonames_baseURL = 'http://api.geonames.org/searchJSON?'
console.log(`Your API key is ${process.env.GEONAMES_USER_NAME}`);

// Post Route
app.post('/city', async function(req, res) {
    destcity = req.body.city;
    console.log(`You entered: ${destcity}`);
    const geonamesINFO = `${geonames_baseURL}q=${destcity}&username=${GEONAMES_USER_NAME}&maxRows=1&lang=en`
    console.log(geonamesINFO)

    const geonamesFetch = await fetch(geonamesINFO)
    const city_lat_long = await geonamesFetch.json()
    console.log(city_lat_long)
    res.send(city_lat_long)
})



//// Weatherbit API ////
const weatherbit_apiKey = process.env.WEATHERBIT_API_KEY
const weatherbit_baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
console.log(`Your API key is ${process.env.WEATHERBIT_API_KEY}`);

app.post('/weather', async function (req, res) {
    destcity_lat = req.body.lat ;
    destcity_long = req.body.lon;
    const weatherbitINFO = `${weatherbit_baseURL}lat=${destcity_lat}&lon=${destcity_long}&key=${weatherbit_apiKey}` 
    console.log(weatherbitINFO)

    const weatherbitFetch = await fetch(weatherbitINFO)
    const weatherbitFetchJSON = await weatherbitFetch.json()
    console.log(weatherbitFetchJSON)
    res.send(weatherbitFetchJSON)
})

//// Pixabay API //// 
const pixabay_apiKey = process.env.PIXABAY_API_KEY
const pixabay_baseURL = 'https://pixabay.com/api/?'
console.log(`Your API key is ${process.env.PIXABAY_API_KEY}`);

app.post('/cityPic', async function (req, res) {
    destcity_pic = req.body.city;
    const pixabayINFO = `${pixabay_baseURL}key=${pixabay_apiKey}&q=${destcity_pic}&image_type=photo&pretty=true&per_page=3` 
    console.log(pixabayINFO)

    const pixabayFetch = await fetch(pixabayINFO)
    const pixabayFetchJSON = await pixabayFetch.json()
    console.log(pixabayFetchJSON)
    res.send(pixabayFetchJSON)
})
