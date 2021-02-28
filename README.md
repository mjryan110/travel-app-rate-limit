# Travel App

This project involved pulling in multiple APIs and using them to display data. The flow of the project and data starts with getting the city name from the user and passing that info to the Geonames API to get the lat/lon. The lat/lon are then used in the Weatherbit API to get weather information. This information varies. If the trip is within 1 week the app outputs the current weather. If the trip is outside of 1 week the app outputs the forecasted weather. Finally, the app outputs an image of the destination city using the city name from the user which is retrieved from the Pixabay API.

# Project Instructions

- Sign up for an API user at [Geonames](http://www.geonames.org/export/web-services.html)
- Sign up for an API user at [Weatherbit](https://www.weatherbit.io/account/create)
- Sign up for an API user at [Pixabay](https://pixabay.com/api/docs/)
- Move to project folder
- Install npm
  - npm install
- Install plugins
  - npm i -D @babel/core @babel/preset-env babel-loader
  - npm i -D style-loader node-sass css-loader sass-loader
  - npm i -D clean-webpack-plugin
  - npm i -D html-webpack-plugin
  - npm i -D mini-css-extract-plugin
  - npm install dotenv
- Create .env file in project home
  - This is where you will house your API key from meaningcloud to keep it private
- Build prodcution
  - npm run build-prod
- Start project
  - npm run start
- Open your localhost that you designate




