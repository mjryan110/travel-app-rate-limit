function handleSubmit(event) {
    event.preventDefault()

    let destinationCityInput = document.getElementById('destination-city').value

    postData('http://localhost:8081/city', {city: destinationCityInput})

    //let originCityInput = document.getElementById('origin-city').value
    //let tripStartDate = new Date(document.getElementById("departure-date").value)
    //let tripEndDate = new Date(document.getElementById("return-date").value)
    //let today = new Date()

    //let tripLength = Math.round((tripEndDate - tripStartDate) / (1000*60*60*24))
    //let timeToTrip = Math.round((tripStartDate - today) / (1000*60*60*24)) 

    //if (tripStartDate < today || tripStartDate > tripEndDate) {
        //alert("Invalid date selection")
        //return
    //}

}

let lat_long = {}

const postData = async(city = "", data = {}) => {
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
        lat_long = {
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
    
export { handleSubmit }