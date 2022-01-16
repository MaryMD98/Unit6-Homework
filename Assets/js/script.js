var openWeatherAPI = "7624e64d3821f1c4e9cbd917e59c3d78";
var placeTOsearch = 'London,uk';
var DataResponse;

// example
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7624e64d3821f1c4e9cbd917e59c3d78

function getcurrentWeatehr(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + placeTOsearch + '&APPID=' + openWeatherAPI)
    
      .then(function(response){
        if (response.ok){

          response.json()
            .then(function(data) {
                console.log("data in getcurrentWeatehr data ")
                console.log(data);
              // save data to global parameter to use in other functions
              DataResponse = data;

              console.log("data sucessfuls accessed");
              console.log("icon " + DataResponse.weather[0].icon);
              var temp = DataResponse.main.temp;
              temp = temp - 273.15;
              temp = temp * 1.8;
              var tempF = temp + 32;
              tempF = Math.round(tempF);
              console.log("Temperature " + tempF);
              console.log("humidity " + DataResponse.main.humidity);
              console.log("wind Speed " + DataResponse.wind.speed);
              console.log("latitude " + DataResponse.coord.lat);
              console.log("longitude " + DataResponse.coord.lon);
              
          });
        } else {
          console.log("error");
        }
      })
}

getcurrentWeatehr();

var latitude = '51.5085';
var longitude = '-0.1257';

//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

function getONECALLWeatehr(){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,minutely,alerts&units=imperial&appid=' + openWeatherAPI)
    
      .then(function(response){
        if (response.ok){

          response.json()
            .then(function(data) {
                console.log("data in getONECALLWeatehr data ")
                console.log(data);
              // save data to global parameter to use in other functions
              DataResponse = data;

              console.log("data sucessfuls accessed");
              console.log("icon " + DataResponse.current.weather[0].icon);
              console.log("Temperature " + DataResponse.current.temp);
              console.log("humidity " + DataResponse.current.humidity);
              console.log("wind Speed " + DataResponse.current.wind_speed);
              console.log("UV INdex " + DataResponse.current.uvi);
             
              
          });
        } else {
          console.log("error");
        }
      })
}

getONECALLWeatehr();