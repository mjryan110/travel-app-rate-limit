const handleSubmit = async(event) => {
    event.preventDefault()

    let destinationCityInput = document.getElementById('destination-city').value
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

    let cityInfo = {}

    const geonamesData = await fetch('http://localhost:8081/city', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({city: destinationCityInput})
    });

    try {
        const geonnamesJSON = await geonamesData.json();
        cityInfo = {
            city: geonnamesJSON.geonames[0].name
        }
        console.log('Data Received', cityInfo)
    } catch(error) {
        console.log('error', error);
    }
}


export { handleSubmit }