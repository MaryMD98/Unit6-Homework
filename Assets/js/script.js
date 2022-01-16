var openWeatherAPI = "7624e64d3821f1c4e9cbd917e59c3d78";

// city name will be set with the name of the user input** waitin gfor event button
var cityName = "Austin";
// locationResponse will be set after the call to gather lat and lon is succesful
var locationResponse;
//nae of city will be displaied on the page
var DisCityName;
// save lat and lon to use in next API call
var latitude;
var longitude;

//function will get latitude and longitude of the location searched by user
function getLocation(){
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + openWeatherAPI)
    
      .then(function(response){
        if (response.ok){

          response.json()
            .then(function(data) {
              // save data to global parameter to use in other functions
              locationResponse = data;

                // save lat and lon to use in next call
                latitude = locationResponse[0].lat;
                longitude = locationResponse[0].lon;
                DisCityName = locationResponse[0].name;
                getONECALLWeatehr();
          });
        } else {
          console.log("ERROR: Location submited is not correct. Please try again");
        }
      })
}

getLocation();

//save a copy of the data returned in one call
var DataResponse;

function getONECALLWeatehr(){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,minutely,alerts&units=imperial&appid=' + openWeatherAPI)
    
      .then(function(response){
        if (response.ok){

          response.json()
            .then(function(data) {
              // save data to global parameter to use in other functions
              DataResponse = data;

              // display the weather
              displayWeather();
          });
        } else {
          console.log("ERROR: No weather information available for the location submitted. Please try again");
        }
      })
}

//
// function will display the data from the call on the page
function displayWeather(){

                 console.log("data sucessfuls accessed");
              console.log("icon " + DataResponse.current.weather[0].icon);
              console.log("Temperature " + DataResponse.current.temp);
              console.log("humidity " + DataResponse.current.humidity);
              console.log("wind Speed " + DataResponse.current.wind_speed);
              console.log("UV INdex " + DataResponse.current.uvi);

              console.log("data of day + 1*****");
              console.log("icon " + DataResponse.daily[1].weather[0].icon);
              console.log("temp max "+ DataResponse.daily[1].temp.max);
              console.log("temp min "+ DataResponse.daily[1].temp.min);
              console.log("wind speed "+ DataResponse.daily[1].wind_speed);
              console.log("Humidity "+ DataResponse.daily[1].humidity);
              console.log("data of day + 2 *********");
              console.log("icon " + DataResponse.daily[2].weather[0].icon);
              console.log("temp max "+ DataResponse.daily[2].temp.max);
              console.log("temp min "+ DataResponse.daily[2].temp.min);
              console.log("wind speed "+ DataResponse.daily[2].wind_speed);
              console.log("Humidity "+ DataResponse.daily[2].humidity);
              console.log("data of day + 3 *********");
              console.log("data of day + 4");
              console.log("data of day + 5");

}