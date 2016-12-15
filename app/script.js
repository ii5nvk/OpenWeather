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

citiesList.addEventListener('change', function(e) {
    if (e.currentTarget.value == '') {

        result.innerHTML = '';

    } else {
        openWeatherCityId = e.currentTarget.value;
        var cookieName = 'cookie' + openWeatherCityId;
        console.log(cookieName);
        var cityCookie = getCookie(cookieName);

       if (document.cookie.indexOf(cookieName) == -1 ) {
           let urlRequest = openWeatherUrl + '?id=' + openWeatherCityId + '&units=metric&APPID=' + openWeatherAppId;

            getData(urlRequest).then(
                function(result) {
                    var cityWeather = JSON.parse(result);
                    showInfo(cityWeather);

                    createCookie(cookieName, result);

                }).catch(function() {
                console.log('error');
            });
         

           
        } else {

           var cityWeather = JSON.parse(cityCookie);
            showInfo(cityWeather);
         
        }
    }
}, false);

function showInfo(cityWeather) {

    let source = weatherTemplate.innerHTML;
    let templateFn = Handlebars.compile(source);
    let template = templateFn(cityWeather);
    result.innerHTML = template;

}

// Create "session" cookie with a 10-minute expiration
function createCookie(name, value) {
    var date = new Date();
    date.setTime(date.getTime() + 600000);
    var expires = "; expires=" + date.toGMTString();

    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(cname) {

    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}