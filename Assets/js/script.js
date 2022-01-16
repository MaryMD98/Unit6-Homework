var openWeatherAPI = "7624e64d3821f1c4e9cbd917e59c3d78";
var placeTOsearch = 'London,uk';
var DataResponse;


// function getcurrentWeatehr(){
//     fetch('http://api.openweathermap.org/data/2.5/weather?q=' + placeTOsearch + '&APPID=' + openWeatherAPI)
    
//       .then(function(response){
//         if (response.ok){

//           response.json()
//             .then(function(data) {
//                 console.log("data in getcurrentWeatehr data ")
//                 console.log(data);
//               // save data to global parameter to use in other functions
//               DataResponse = data;

//               console.log("data sucessfuls accessed");
//               console.log("icon " + DataResponse.weather[0].icon);
//               var temp = DataResponse.main.temp;
//               temp = temp - 273.15;
//               temp = temp * 1.8;
//               var tempF = temp + 32;
//               tempF = Math.round(tempF);
//               console.log("Temperature " + tempF);
//               console.log("humidity " + DataResponse.main.humidity);
//               console.log("wind Speed " + DataResponse.wind.speed);
//               console.log("latitude " + DataResponse.coord.lat);
//               console.log("longitude " + DataResponse.coord.lon);
              
//           });
//         } else {
//           console.log("error");
//         }
//       })
// }

// getcurrentWeatehr();

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
             
              
          });
        } else {
          console.log("error");
        }
      })
}

getONECALLWeatehr();