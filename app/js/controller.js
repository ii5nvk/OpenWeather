var Controller = {
    weatherRoute: function(id) {
        return Model.getOpenWeatherById(id).then(function(cityWeather) {
            result.innerHTML = View.render('weather', cityWeather);
        });
    }
};
