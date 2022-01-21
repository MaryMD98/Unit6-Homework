var openWeatherAPI = "7624e64d3821f1c4e9cbd917e59c3d78";

//save the user search hisptory
var UserSearchHistory = [];
// city name will be set with the name of the user input needed to do te call for get location
var cityName;
// locationResponse will be set after the call to gather lat and lon is succesful
var locationResponse;
//nae of city will be displaied on the page
var DisCityName;

//event listener when city is inputted
var inputAdre = document.querySelector('#locationInput');
inputAdre.addEventListener('submit', function(event){
  event.preventDefault();

  if(event.target.elements[0].value !== ''){
    cityName = event.target.elements[0].value;
    event.target.elements[0].value = '';
    getLocation();
  }
});

var HistoryDisplay = document.querySelector('.HistDisplay');
//display user search history on page
function DisplayUserHIs(){
  
}

//function will get latitude and longitude of the location searched by user
function getLocation(){
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + openWeatherAPI)
    
      .then(function(response){
        if (response.ok){

          response.json()
            .then(function(data) {
              // save data to global parameter to use in other function
              locationResponse = data;
              // check if the input data has been used before
              if(!UserSearchHistory.includes(locationResponse[0].name)){
                //check if there are more than 5 searches
                  if(UserSearchHistory.lenght === 5){
                    UserSearchHistory.shift();
                  }
                  //save the new search on user search history
                  UserSearchHistory.push(locationResponse[0].name);

                  //save search to local history transform to string
                  localStorage.setItem("userHistory",JSON.stringify(UserSearchHistory));

                  // save lat and lon to use in next call
                  DisCityName = locationResponse[0].name;
                  getONECALLWeatehr(locationResponse[0].lat , locationResponse[0].lon );
                  DisplayUserHIs();
              }
          });
        } else {
          console.log("ERROR: Location submited is not correct. Please try again");
        }
      })
}

//save a copy of the data returned in one call
var DataResponse;

function getONECALLWeatehr(latitude, longitude){
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

// global parameters used on weather display
var icon = "http://openweathermap.org/img/wn/";

// function will display the data from the call on the page
//current day display
var DisplayCurrent = document.querySelector('.display-today');
// create elements
var cityNamEl = document.createElement('h2');
var iconEl = document.createElement('img');
var TemperatureEl = document.createElement('p');
var WindEl = document.createElement('p');
var HumidityEl = document.createElement('p');
var uvIndexEl = document.createElement('p');
    uvIndexEl.setAttribute('class', 'uvlight');
var labeluvIndex = document.createElement('span');
    labeluvIndex.setAttribute('class', 'badge'); 

function displayWeather(){
    //display current data on page
    // display city name and current date
    cityNamEl.textContent = DisCityName + "  " + moment.unix(DataResponse.current.dt).format("M/D/YYYY");
    // display icon        
    iconEl.src = icon + DataResponse.current.weather[0].icon + "@2x.png";
    // display temperature
    TemperatureEl.textContent = "Temp: " + DataResponse.current.temp + "°F ";
    // display wind speed
    WindEl.textContent = "Wind: " + DataResponse.current.wind_speed + "MPH";
    // display Humidity
    HumidityEl.textContent = "Humidity: " + DataResponse.current.humidity + "%";
    //display uv index
    uvIndexEl.textContent = "UV Index: ";

    labeluvIndex.textContent = DataResponse.current.uvi;
    var uvindexcolor = DataResponse.current.uvi;
    // appends to display on page
    DisplayCurrent.append(cityNamEl,iconEl,TemperatureEl,WindEl,HumidityEl,uvIndexEl,labeluvIndex);
    DisplayCurrent.setAttribute("style", "font-size: 18px; font-weight: bold");  
    cityNamEl.setAttribute("style", "display: inline-block");
    iconEl.setAttribute("style", "display: inline-block");
    
        if( uvindexcolor < 3){
          labeluvIndex.setAttribute("style", "background-color: green; color: white");
        } else if( uvindexcolor <= 5){
          labeluvIndex.setAttribute("style", "background-color: yellow");
        } else if( uvindexcolor <= 7){
          labeluvIndex.setAttribute("style", "background-color: orange"); 
        } else if( uvindexcolor <= 10){
          labeluvIndex.setAttribute("style", "background-color: red; color: white"); 
        } else {
          labeluvIndex.setAttribute("style", "background-color: purple; color: white");  
        }
    //display 5 days weather
    display5DayWeather();
}

//function to display for 5 days
function display5DayWeather(){
  var Columfor5days = document.querySelector('.colum5day');
  //display 5 days 
  var weatherpointer = 1;

  // remove previous 5-day displayed from previous call
  while(Columfor5days.lastChild){
    Columfor5days.removeChild(Columfor5days.lastChild);
  }

  // display the columns and information
  for(var i = 0 ; i < 5; i++){
    // create the div col to create one of the columns
    var columTOdis = document.createElement('div');
    columTOdis.setAttribute('class', 'col card');
  
    // create the elemnts to add to the columns
    var datetoDis = document.createElement('h4');
    var iconEl2 = document.createElement('img');
    var info = document.createElement('ul');
    var TemperatureEl2 = document.createElement('li');
    var WindEl2 = document.createElement('li');
    var HumidityEl2 = document.createElement('li');

    // display date
    datetoDis.textContent = moment.unix(DataResponse.daily[weatherpointer].dt).format("M/D/YYYY");
    // display icon        
    iconEl2.src = icon + DataResponse.daily[weatherpointer].weather[0].icon + "@2x.png";
    // display temperature
    TemperatureEl2.textContent = "Temp: " + DataResponse.daily[weatherpointer].temp.day + "°F ";
    // display wind speed
    WindEl2.textContent = "Wind: " + DataResponse.daily[weatherpointer].wind_speed + " MPH";
    // display Humidity
    HumidityEl2.textContent = "Humidity: " + DataResponse.daily[weatherpointer].humidity + "%";

    // appends to display on page
    info.append(TemperatureEl2,WindEl2,HumidityEl2);

      info.setAttribute("style", "font-size: 14px");
      datetoDis.setAttribute("style", "font-size: 18px; margin-top: 5px");

      columTOdis.append(datetoDis,iconEl2,info);
      columTOdis.setAttribute("style", "margin-right: 20px");

      Columfor5days.append(columTOdis);
      weatherpointer++;
  }
}