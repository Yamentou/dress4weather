//Get location city
navigator.geolocation.getCurrentPosition(function(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  var url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=84e9d93fa1c1461bbe10061be1146f3a`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var city = data.results[0].components.city;
      console.log(city);

      //Get weather information
      const API_KEY = '8252ee1caf5a40e993441246230601';
      const API_ENDPOINT = 'https://api.weatherapi.com/v1/current.json';

      async function getWeather(location) {
        try {
          const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}&q=${location}`);
          const data = await response.json();
          console.log(data);
          return data;
        } catch (error) {
          console.error(error);
        }
      }

      getWeather(city).then(data => {
          const weatherData = data.current;
          const location = data.location;
        
          const weatherTemp = document.getElementById('weather-temp');
          weatherTemp.innerHTML = `Today is: ${data.location.localtime.substring(0,10)}. `;
          weatherTemp.innerHTML += `The current temperature in ${data.location.name} is ${data.current.temp_f}°C`;

          let forecast = 'It will not rain during the day.';
          if (data.current.precip_mm > 0) {
              forecast = 'It will rain during the day.';
          }

          const weatherRainornot = document.getElementById('weather-rainornot');
          weatherRainornot.innerHTML = `${forecast}`;
          //${data.current.condition['text']}

      });

    })
    .catch(error => console.error(error));
});


  