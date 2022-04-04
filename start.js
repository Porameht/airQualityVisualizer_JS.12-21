(() => {
  const KEY = "1c30a054-d9b8-4b4d-8962-6f3b27749a4e";

  async function getAirQuality({ city, state, country }) {
    const response = await fetch(
      `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${KEY}`
    );
    const {
      data: { current },
    } = await response.json();
    const { pollution, weather } = current;
    // console.log(pollution, weather);
    return {
      aqi: pollution.aqius,
      temperature: weather.tp,
      humidity: weather.hu,
      wind: weather.ws,
    };
  }

  function displayAirQuality({
    city,
    state,
    country,
    aqi,
    temperature,
    humidity,
    wind,
  }) {
    const cityElem = document.querySelector(".city");
    const stateElem = document.querySelector(".state-country");
    const aqiElem = document.querySelector(".aqi > h1");
    const temperatureElem = document.querySelector(".temperature");
    const humidityElem = document.querySelector(".humidity");
    const windElem = document.querySelector(".wind");

    cityElem.innerText = city;
    stateElem.innerText = `${state}, ${country}`;
    aqiElem.innerText = aqi;
    temperatureElem.innerText = `Temp: ${temperature} C`;
    humidityElem.innerText = `Humidity: ${humidity}%`;
    windElem.innerText = `wind: ${wind} m/s`;
  }

  const setAirQualityColor = (aqi) => {
    if (aqi <= 50) {
      document.documentElement.style.setProperty(
        "--current-aqi-color",
        "var(--good-aqi-color)"
      );
    } else if (aqi <= 100) {
      document.documentElement.style.setProperty(
        "--current-aqi-color",
        "var(--medium-aqi-color)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--current-aqi-color",
        "var(--bad-aqi-color)"
      );
    }
  };
  async function run() {
    const city = "Ban-Bueng";
    const state = "Chon-Buri";
    const country = "Thailand";

    const { aqi, temperature, humidity, wind } = await getAirQuality({
      city,
      state,
      country,
    });

    displayAirQuality({
      city,
      state,
      country,
      aqi,
      temperature,
      humidity,
      wind,
    });

    setAirQualityColor(aqi);
  }
  run();
})();
