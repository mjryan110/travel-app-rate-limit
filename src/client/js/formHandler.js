function handleSubmit(event) {
    event.preventDefault()

    let destinationCityInput = document.getElementById('destination-city').value

    postDataCity('http://localhost:8081/city', {city: destinationCityInput})
    postDataWeather('http://localhost:8081/weather', {lat: lat_long.lat, lon: lat_long.long})
}


const postDataCity = async(city = "", data = {}) => {
    console.log('Analyzing', data);
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
        console.log('Data Received:', lat_long)
        return lat_long;        
    } catch(error) {
        console.log('error', error);
    }
};

const postDataWeather = async(weather = "", data = {}) => {
    console.log('Analyzing', data);
    const geonamesData = await fetch(weather, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const weatherbitJSON = await geonamesData.json();
        console.log('Data Received:', weatherbitJSON)
        return weatherbitJSON;        
    } catch(error) {
        console.log('error', error);
    }
};




export { handleSubmit }