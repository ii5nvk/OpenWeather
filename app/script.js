function getData(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.addEventListener('load', function() {
            resolve(xhr.responseText);
        });

        xhr.addEventListener('error', function() {
            reject();
        });

    });
}

var openWeatherAppId = '1e83a150ab5c829ff54fb46e1320d3f6',
    openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather',
    openWeatherCityId;

    citiesList.addEventListener('change', function(e){
      if (e.currentTarget.value==''){

         result.innerHTML = '';

      } else{
      openWeatherCityId =  e.currentTarget.value;
      let urlRequest=openWeatherUrl+'?id='+ openWeatherCityId + '&units=metric&APPID=' + openWeatherAppId;

getData(urlRequest).then(
    function(result) {
        var cityWeather = JSON.parse(result);
        showInfo(cityWeather);

    }).catch(function() {
    console.log('error');
});
 }     
}, false);

function showInfo(cityWeather){

  let source = weatherTemplate.innerHTML;
  let templateFn = Handlebars.compile(source);
  let template = templateFn(cityWeather); 
  result.innerHTML = template;

}




/*var weather = new XMLHttpRequest();
    weather.open("GET", "http://api.openweathermap.org/data/2.5/weather?id=2950159&units=metric&APPID=1e83a150ab5c829ff54fb46e1320d3f6", false);
    weather.send();

    var r = JSON.parse(weather.response);
    console.log(r);



      {
        "coord":{"lon":13.41,"lat":52.52},
        "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
        "base":"stations",
        "main":{"temp":276.13,"pressure":1024,"humidity":86,"temp_min":275.15,"temp_max":277.15},
        "visibility":10000,
        "wind":{"speed":2.1,"deg":180},
        "clouds":{"all":0},
        "dt":1481640600,
        "sys":{"type":1,"id":4892,"message":0.3685,"country":"DE","sunrise":1481612994,"sunset":1481640723},
        "id":2950159,
        "name":"Berlin",
        "cod":200}*/