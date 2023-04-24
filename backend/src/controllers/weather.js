const axios = require('axios');

module.exports = {
    getCurrentWeather
};

function getCurrentWeather(lng, lat) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${process.env.OPEN_WEATHER_API_TOKEN}`)
        .then((response) => {
            return Promise.resolve(response.data.weather[0]);
        });
}
