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

//API
const apiKey = process.env.API_KEY
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
console.log(`Your API key is ${process.env.API_KEY}`);

const port = 8081;

app.listen(port, function () {
    console.log(`Running on localhost: ${port}`)
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    })

//Post route
app.post('/api', async function(req, res) {
    userURL = req.body.url;
    console.log(`You entered: ${userURL}`);
    const apiURL = `${baseURL}key=${apiKey}&url=${userURL}&lang=en`

    const response = await fetch(apiURL)
    const sentimentData = await response.json()
    console.log(sentimentData)
    res.send(sentimentData)
    const projectData = {
        agreement : sentimentData.agreement,
        confidence: sentimentData.confidence,
        subjectivity: sentimentData.subjectivity
    }

    res.send(projectData);

})