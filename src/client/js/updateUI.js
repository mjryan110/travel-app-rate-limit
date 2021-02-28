function updateUI(lat_long, dates, weather, citySRC) {
    return `
        <section id="trip-info-section" class="trip-info-section">
            <div>
                <span id='close' 
                    onclick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode); 
                    return false;'>
                    X
                </span>
            </div>
            <div class="trip-info-card">
                <div class="content-container" id="picture-box">
                    <img class="destination-pic-displayed" src=${citySRC.cityPic}>
                </div>
                <div class="content-container" id="info-box">
                    <div id="trip-info-bulk" class="base-text">
                        <div class="destination-city">
                            Destination City: 
                            <span id="updated-destination-city" class="updated-info">
                            ${lat_long.city}
                            </span>
                        </div>
                        <div id="depart-date" class="base-text">
                            Date of Departure: 
                            <span id="updated-depart-date" class="updated-info">
                            ${dates.departureDateUI}
                            </span>
                        </div>
                        <div id="max-temp" class="base-text">
                            Expect a Max Temperature of: 
                            <span id="updated-max-temp" class="updated-info">
                            ${weather.maxtemp}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>`
}

export { updateUI }