function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value
    
    if(Client.checkForName(formText)) {
        
        postData('http://localhost:8080/api', {url: formText})

        .then(function(res) {
            document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
            document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
            document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
        })
        } else {
            alert('Invalid URL.');
        }
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