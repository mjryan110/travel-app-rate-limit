const handleSubmit = async(event) => {
    event.preventDefault()

    let destinationCityInput = document.getElementById('destination-city').value
    let departureDate = document.getElementById('departure-date').value;
    
    const lat_long = await
    
    postDataCity('http://localhost:8081/city', {city: destinationCityInput})
    postDataWeather('http://localhost:8081/weather', {lat: lat_long.lat, lon: lat_long.long})
    postDataPicture('http://localhost:8081/cityPic', {city: destinationCityInput})

    document.getElementById("updated-destination-city").innerHTML = destinationCityInput;
    document.getElementById("updated-depart-date").innerHTML = departureDate;
    document.getElementById("updated-max-temp").innerHTML = lat_long.lat;
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

    let timeToDeparture = Math.round((departureDate - today) / (1000*60*60*24))+1

    if (departureDate < today) {
        alert('Invalid Dates - Departure Date must be in the future')
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
        if (timeToDeparture < 8) {
            var weatherInformation = {
                date: weatherbitJSON.data[0].valid_date,
                maxTemp: weatherbitJSON.data[0].max_temp
            }
        } else {
            var weatherInformation = {
                date: weatherbitJSON.data[`${timeToDeparture}`].valid_date,
                maxTemp: weatherbitJSON.data[`${timeToDeparture}`].max_temp
            }
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

/**function updateUI(event) {
    hidden_info_card.classList.remove('hidden-info');

    let destination_city = document.getElementById("updated-destination-city");

    destination_city.innerHTML = event.to;
}
*/
export { handleSubmit }