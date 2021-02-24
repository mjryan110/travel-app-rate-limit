const handleSubmit = async(event) => {
    event.preventDefault()

    let destinationCityInput = document.getElementById('destination-city').value
    

    const lat_long = await
    postDataCity('http://localhost:8081/city', {city: destinationCityInput})
    postDataWeather('http://localhost:8081/weather', {lat: lat_long.lat, lon: lat_long.long})
    postDataPicture('http://localhost:8081/cityPic', {city: destinationCityInput})
}


const postDataCity = async(city = "", data = {}) => {
    console.log('Analyzing Lat and Long', data);
    const geonamesData = await fetch(city, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const geonnamesJSON = await geonamesData.json();
        var lat_long = {
            city: geonnamesJSON.geonames[0].name,
            lat: geonnamesJSON.geonames[0].lat,
            long: geonnamesJSON.geonames[0].lng
        }
        console.log('Lat and Long Data Received:', lat_long)
        return lat_long;        
    } catch(error) {
        console.log('error', error);
    }
};

const postDataWeather = async(weather = "", data = {}) => {
    console.log('Analyzing Weather Data', data);
    
    let today = new Date()
    let departureDate = new Date(document.getElementById('departure-date').value)
    let returnDate = new Date(document.getElementById('return-date').value)

    let timeToDeparture = Math.round((departureDate - today) / (1000*60*60*24))+1
    let lengthOfTrip = returnDate - departureDate

    if (departureDate < today) {
        alert('Invalid Dates - Departure Date must be in the future')
        return
    }

    if (departureDate > returnDate) {
        alert('Invalid Dates - Return Date must be after Departure Date')
        return
    }


    const weatherbitData = await fetch(weather, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    try {
        const weatherbitJSON = await weatherbitData.json();
        var weatherInformation = {
            date: (timeToDeparture < 8) ? weatherbitJSON.data[0].valid_date: weatherbitJSON.data[`${timeToDeparture}`].valid_date,
            maxTemp: (timeToDeparture < 8) ? weatherbitJSON.data[0].max_temp: weatherbitJSON.data[`${timeToDeparture}`].max_temp
        }
        console.log('Weather Data Received:', weatherInformation)
        return weatherInformation;        
    } catch(error) {
        console.log('error', error);
    }
};

const postDataPicture = async(city = "", data = {}) => {
    console.log('Analyzing', data);
    const pixabayData = await fetch(city, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const pixabayJSON = await pixabayData.json();
        var city_pic = {
            cityPicURL: pixabayJSON.hits[0].webformatURL
        }
        console.log('Pixabay Data Received:', city_pic)
        return city_pic;        
    } catch(error) {
        console.log('error', error);
    }
};


export { handleSubmit }