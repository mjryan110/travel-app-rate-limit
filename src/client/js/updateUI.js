function updateUI(lat_long, dates, weather) {
    return `
    <section id="hidden_info_card" class="hidden-info">
        <div class="trip-info">
            <div id="destination_city" class="destination-pic">
                <img class="destination-pic-displayed" src="https://travel.usnews.com/dims4/USNEWS/174da58/2147483647/resize/255x255%5E%3E/crop/255x255/quality/85/?url=https://travel.usnews.com/images/pineapple_fountain_edited2_pgnDp5c.jpg"
                alt="detination-pic-displayed-alt">
            </div>
            <div class="trip-info-bulk">
                <div class="destination-city">
                    Destination City: 
                    <span id="updated-destination-city">
                    ${lat_long.city}
                    </span>
                </div>
                <div class="depart-date">
                    Date of Departure: 
                    <span id="updated-depart-date">
                    ${dates.departureDateUI}
                    </span>
                </div>
                <div class="max-temp">
                    Expect a Max Temperature of: 
                    <span id="updated-max-temp">
                    ${weather.maxtemp}
                    </span>
                </div>
            </div>
        </div>
    </section>`
}

export { updateUI }