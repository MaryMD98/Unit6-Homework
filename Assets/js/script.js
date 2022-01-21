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
    // next 5 days display
    // var Display5day = document.querySelector('.display-5days');
    var Columfor5days = document.querySelector('.colum5day');
    var rowOF5 = document.querySelector('.rowfor5');
     // create elements 
    var datetoDis = document.createElement('h3');
    var iconEl = document.createElement('img');
    var TemperatureEl = document.createElement('p');
    var TemperatureHEl = document.createElement('p');
    var TemperatureLEl = document.createElement('p');
    var WindEl = document.createElement('p');
    var HumidityEl = document.createElement('p');
    var temp;
    var temp2;
        console.log("display 5 days of weather");
    //display 5 days // high = "High "; low = "Low ";
    

    // // display date
    // datetoDis = "monday";
    // // display icon        
    // icon = DataResponse.daily[1].weather[0].icon;
    // temp = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    // iconEl.src = temp;
    // // display temperature
    // temp = high + DataResponse.daily[1].temp.max;
    // temp2 = low + DataResponse.daily[1].temp.min;
    // TemperatureEl.textContent = Temperature;
    // TemperatureHEl.textContent = temp + fahrenheit;
    // TemperatureLEl.textContent = temp2 + fahrenheit;
    // // display wind speed
    // temp = DataResponse.daily[1].wind_speed;
    // WindEl.textContent = Wind + temp + mph;
    // // display Humidity
    // temp = DataResponse.daily[1].humidity;
    // HumidityEl.textContent = Humidity + temp + persentageIcon;
  
    // // appends to display on page
    // Columfor5days.append(datetoDis,iconEl,TemperatureEl,TemperatureHEl,TemperatureLEl,WindEl,HumidityEl);

    
    
for(var i = 0 ; i < 5; i++){
  var weatherpointer = 1;
  var Display1day = Columfor5days.querySelectorAll('.color');
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
  TemperatureHEl.textContent = temp + fahrenheit;
  TemperatureLEl.textContent = temp2 + fahrenheit;
  // display wind speed
  temp = DataResponse.daily[weatherpointer].wind_speed;
  WindEl.textContent = Wind + temp + mph;
  // display Humidity
  temp = DataResponse.daily[weatherpointer].humidity;
  HumidityEl.textContent = Humidity + temp + persentageIcon;

  // appends to display on page
  Display1day[i].appendChild(datetoDis,iconEl,TemperatureEl,TemperatureHEl,TemperatureLEl,WindEl,HumidityEl);
  weatherpointer++;
}
    // // display date
    // datetoDis = "monday";
    // // display icon        
    // icon = DataResponse.daily[2].weather[0].icon;
    // temp = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    // iconEl.src = temp;
    // // display temperature
    // temp = DataResponse.daily[2].temp.max;
    // temp2 = DataResponse.daily[2].temp.min;
    // TemperatureEl.textContent = Temperature + temp + fahrenheit + temp2 + fahrenheit;
    // // display wind speed
    // temp = DataResponse.daily[2].wind_speed;
    // WindEl.textContent = Wind + temp + mph;
    // // display Humidity
    // temp = DataResponse.daily[2].humidity;
    // HumidityEl.textContent = Humidity + temp + persentageIcon;



            //   console.log("data of day + 2 *********");
            //   console.log("icon " + DataResponse.daily[2].weather[0].icon);
            //   console.log("temp max "+ DataResponse.daily[2].temp.max);
            //   console.log("temp min "+ DataResponse.daily[2].temp.min);
            //   console.log("wind speed "+ DataResponse.daily[2].wind_speed);
            //   console.log("Humidity "+ DataResponse.daily[2].humidity);

          //   var availableBodiesDisplay = document.querySelector('.available-bodies');
          //   availableBodiesDisplay.innerHTML = ''
          //   let count = 0
                   
          //          planetInfo.forEach((planet)=>{
   
          //              var planetCardEl = document.createElement('div');
          //              planetCardEl.setAttribute('class', 'card horizontal');
   
          //              var planetImageDivEl = document.createElement('div');
          //              planetImageDivEl.setAttribute('class', 'card-image valign-wrapper');
   
          //              var planetImageEl = document.createElement('img');
          //              planetImageEl.setAttribute('src', `${pics[count]}`);
   
          //              count++
   
          //              var planetContentEl = document.createElement('div');
          //              planetContentEl.setAttribute('class', 'card-content');
   
          //              var planetHeader = document.createElement('h4');
                     
          //              planetHeader.textContent = planet[0]
                   
          //              var planetContentUl = document.createElement('ul');
   
          //              let titleOfPlanet = planet.shift()
          //              planet.forEach((listInfo)=>{
          //                  var planetContentLi = document.createElement('li');
          //                  planetContentLi.innerText = listInfo;
          //                  planetContentUl.appendChild(planetContentLi)
          //              })
          //              planet.unshift(titleOfPlanet)
   
          //              planetImageDivEl.append(planetImageEl);
          //              planetContentEl.append(planetHeader, planetContentUl);
          //              planetCardEl.append(planetImageDivEl, planetContentEl);
          //              availableBodiesDisplay.append(planetCardEl);
                       
          //          })
         
          //  }
}