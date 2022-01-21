var openWeatherAPI = "7624e64d3821f1c4e9cbd917e59c3d78";

// city name will be set with the name of the user input** waitin gfor event button
var cityName = "london";
// locationResponse will be set after the call to gather lat and lon is succesful
var locationResponse;
//nae of city will be displaied on the page
var DisCityName;
// save lat and lon to use in next API call
var latitude;
var longitude;

//
getLocation();
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
                console.log(DataResponse);
              // display the weather
              displayWeather();
          });
        } else {
          console.log("ERROR: No weather information available for the location submitted. Please try again");
        }
      })
}

// global parameters used on weather display
var Wind = "Wind: ";
var Humidity = "Humidity: ";
var uvIndex = "UV Index: ";
var Temperature = "Temp: ";
var mph = " mph";
var high = "High ";
var low = "Low ";
var persentageIcon = "%";
var fahrenheit = "°F  ";
var icon;

// function will display the data from the call on the page
function displayWeather(){
    //current day display
    var DisplayCurrent = document.querySelector('.display-today');
    // create elements
    var cityNamEl = document.createElement('h3');
    var iconEl = document.createElement('img');
    var TemperatureEl = document.createElement('p');
    var WindEl = document.createElement('p');
    var HumidityEl = document.createElement('p');
    var uvIndexEl = document.createElement('p');
    var temp;

    console.log("display current weather");
    //display current dataon page
    // display city name and current date
    cityNamEl = DisCityName;
    // display icon        
    icon = DataResponse.current.weather[0].icon;
    temp = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    iconEl.src = temp;
    // display temperature
    temp = DataResponse.current.temp;
    TemperatureEl.textContent = Temperature + temp + fahrenheit;
    // display wind speed
    temp = DataResponse.current.wind_speed;
    WindEl.textContent = Wind + temp + mph;
    // display Humidity
    temp = DataResponse.current.humidity;
    HumidityEl.textContent = Humidity + temp + persentageIcon;
    //display uv index
    temp = DataResponse.current.uvi;
    uvIndexEl.textContent = uvIndex + temp;

    // appends to display on page
    DisplayCurrent.append(cityNamEl,iconEl,TemperatureEl,WindEl,HumidityEl,uvIndexEl);
    //display 5 days weather
    display5DayWeather();
}

//function to display for 5 days
function display5DayWeather(){
    var Columfor5days = document.querySelector('.colum5day');
    var temp;
    var temp2;
    //display 5 days 
    var weatherpointer = 1;

// display the columns and information
for(var i = 0 ; i < 5; i++){
    // create the div col to create one of the columns
    var columTOdis = document.createElement('div');
    columTOdis.setAttribute('class', 'col card');
  
    // create the elemnts to add to the columns
    var datetoDis = document.createElement('h3');
    var iconEl = document.createElement('img');
    var info = document.createElement('ul');
    var TemperatureEl = document.createElement('li');
    var TemperatureHEl = document.createElement('li');
    var TemperatureLEl = document.createElement('li');
    var WindEl = document.createElement('li');
    var HumidityEl = document.createElement('li');

  // display date
  datetoDis = "monday";
    // display icon        
    icon = DataResponse.daily[weatherpointer].weather[0].icon;
    temp = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    iconEl.src = temp;
    // display temperature
    temp = high + DataResponse.daily[weatherpointer].temp.max;
    temp2 = low + DataResponse.daily[weatherpointer].temp.min;
    TemperatureEl.textContent = Temperature;
    // TemperatureHEl.textContent = temp + fahrenheit + temp2 + fahrenheit;
    TemperatureHEl.textContent = temp + fahrenheit;
    TemperatureLEl.textContent = temp2 + fahrenheit;
    // display wind speed
    temp = DataResponse.daily[weatherpointer].wind_speed;
    WindEl.textContent = Wind + temp + mph;
    // display Humidity
    temp = DataResponse.daily[weatherpointer].humidity;
    HumidityEl.textContent = Humidity + temp + persentageIcon;

  // appends to display on page
  info.append(TemperatureEl,
    TemperatureHEl,
    TemperatureLEl,
    WindEl,
    HumidityEl);

  info.setAttribute("style", "font-size: 13px");
  TemperatureHEl.setAttribute("style", "font-size: 11px; font-weight: bold");
  TemperatureLEl.setAttribute("style", "font-size: 11px; font-weight: bold");
  columTOdis.append(datetoDis,iconEl,info);
  columTOdis.setAttribute("style", "margin-right: 20px");
  Columfor5days.append(columTOdis);
  
  weatherpointer++;
}
  
}