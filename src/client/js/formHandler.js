const handleSubmit = async(event) => {
    event.preventDefault()

    let destinationCityInput = document.getElementById('destination-city').value
    
    const lat_long = await

    postDataCity('http://34.73.33.72:8081/city', {city: destinationCityInput})
    
    // Getting Date info for UI
    let todayUI = new Date()
    let departureDateUI = new Date(document.getElementById('departure-date').value)
    let timeToDepartureUI = Math.round((departureDateUI - todayUI) / (1000*60*60*24))+1

    let dates = {todayUI, departureDateUI, timeToDepartureUI}
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

export { handleSubmit }
