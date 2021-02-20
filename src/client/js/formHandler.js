import { response } from "express";

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let originCityInput = document.getElementById('origin-city').value
    let destinationCityInput = document.getElementById('destination-city').value
    let tripStartDate = new Date(document.getElementById("departure-date").value)
    let tripEndDate = new Date(document.getElementById("return-date").value)
    let today = new Date()
    
    
    

}

const postData = async(url = "", data = {}) => {
    console.log('Analyzing', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log('Data Received:', newData)
        return newData;
    } catch(error) {
        console.log('error', error);
    }
};

export { handleSubmit }