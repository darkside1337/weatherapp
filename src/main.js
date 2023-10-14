//// Placeholder City obj
let currentLocation = {
  cityName: "New York",
  countryName: "United States of America",
  lastUpdated: "2023-10-13 07:15",
  tempC: 10.6,
  tempF: 51.1,
  weatherDescription: "Sunny",
  weatherIcon: "cdn.weatherapi.com/weather/64x64/day/113.png",
  feelsLikeC: 8.7,
  feelsLikeF: 47.7,
  humidity: 71,
  windSpeedKPH: 3.6,
  windSpeedMPH: 2.2,
};
//// default unit system
let useMetric = true;
//
const searchBox = document.getElementById("searchBox");
const searchForm = document.getElementById("searchForm");
const imperialButton = document.getElementById("imperial");
const metricButton = document.getElementById("metric");
////
const setCurrentLocation = (updatedCurrentLocation) => {
  currentLocation = updatedCurrentLocation;
};
const makeRequest = async (str) => {
  let location = encodeURI(str);
  let apiKey = "e7250c597a324870a50140655231110";
  let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  let response = await fetch(url, { mode: "cors" });
  showLoader();
  try {
    if (response.ok) {
      console.log(response.status);
      let data = await response.json();
      return data;
    } else {
      throw new Error(
        `error status: ${response.status}, ${response.statusText}`,
        { cause: response.status }
      );
    }
  } catch (error) {
    errorHandler(error);
  } finally {
    hideLoader();
  }
};

const selectRelevantData = (data) => {
  let relevantData = {
    cityName: data.location.name,
    countryName: data.location.country,
    lastUpdated: data.current.last_updated,
    tempC: data.current.temp_c,
    tempF: data.current.temp_f,
    weatherDescription: data.current.condition.text,
    weatherIcon: data.current.condition.icon.slice(2),
    feelsLikeC: data.current.feelslike_c,
    feelsLikeF: data.current.feelslike_f,
    humidity: data.current.humidity,
    windSpeedKPH: data.current.wind_kph,
    windSpeedMPH: data.current.wind_mph,
  };
  return relevantData;
};
const displayInfo = (obj) => {
  let mainContainer = document.querySelector(".main_container");
  mainContainer.innerHTML = `<div class="loader">Loading...</div>`;
  /// generates the UI depending on the measuring system
  //
  // location div
  const locationDiv = document.createElement("div");
  locationDiv.classList.add("location");
  const pLocation = document.createElement("p");
  pLocation.classList.add("sublabel");
  const h1Location = document.createElement("h1");
  // location input
  pLocation.textContent = "Location";
  h1Location.textContent = `${obj.cityName}, ${obj.countryName}`;
  // location append
  locationDiv.appendChild(pLocation);
  locationDiv.appendChild(h1Location);
  mainContainer.appendChild(locationDiv);
  //
  /// weather icon div
  const weatherIconDiv = document.createElement("div");
  weatherIconDiv.classList.add("weatherIcon");
  const weatherImg = document.createElement("img");
  weatherImg.src = `https:${obj.weatherIcon}`;
  weatherImg.setAttribute("draggable", "false");
  /// weather icon append
  weatherIconDiv.appendChild(weatherImg);
  mainContainer.appendChild(weatherIconDiv);
  //
  // weather description div
  const weatherDescriptionContainer = document.createElement("div");
  weatherDescriptionContainer.classList.add("weatherDescription");
  const weatherLabel = document.createElement("p");
  weatherLabel.classList.add("sublabel");
  weatherLabel.textContent = "Weather";
  const weatherDescriptionH1 = document.createElement("h1");
  weatherDescriptionH1.textContent = `${obj.weatherDescription}`;
  // weatherDiv append
  weatherDescriptionContainer.appendChild(weatherLabel);
  weatherDescriptionContainer.appendChild(weatherDescriptionH1);
  mainContainer.appendChild(weatherDescriptionContainer);
  //
  // current date div
  const currentDateContainer = document.createElement("div");
  currentDateContainer.classList.add("currentDate");
  const currentDateSubLabel = document.createElement("p");
  currentDateSubLabel.classList.add("sublabel");
  currentDateSubLabel.textContent = "Last updated";
  const currentDateH1 = document.createElement("h1");
  currentDateH1.textContent = `${obj.lastUpdated}`;
  // Append current date
  currentDateContainer.appendChild(currentDateSubLabel);
  currentDateContainer.appendChild(currentDateH1);
  mainContainer.appendChild(currentDateContainer);
  //
  // temperature div
  const temperatureDiv = document.createElement("div");
  temperatureDiv.classList.add("temperature");
  const tempP = document.createElement("p");
  tempP.textContent = "temperature";
  tempP.classList.add("sublabel");
  const tempH1 = document.createElement("h1");
  if (useMetric) {
    tempH1.textContent = `${obj.tempC} °C`;
  } else {
    tempH1.textContent = `${obj.tempF} °F`;
  }

  // append temperature
  temperatureDiv.appendChild(tempP);
  temperatureDiv.appendChild(tempH1);
  mainContainer.appendChild(temperatureDiv);
  //
  // feels like div
  const feelsLikeDiv = document.createElement("div");
  feelsLikeDiv.classList.add("feelsLike");
  const feelsLikeP1 = document.createElement("p");
  feelsLikeP1.classList.add("sublabel");
  feelsLikeP1.textContent = "feels like";
  const feelsLikeH1 = document.createElement("h1");
  if (useMetric) {
    feelsLikeH1.textContent = `${obj.feelsLikeC} °C`;
  } else {
    feelsLikeH1.textContent = `${obj.feelsLikeF} °F`;
  }
  //feels like append
  feelsLikeDiv.appendChild(feelsLikeP1);
  feelsLikeDiv.appendChild(feelsLikeH1);
  mainContainer.appendChild(feelsLikeDiv);
  //
  // humidity div
  const humidityDiv = document.createElement("div");
  humidityDiv.classList.add("humidity");
  const humidityP1 = document.createElement("p");
  humidityP1.classList.add("sublabel");
  humidityP1.textContent = "humidity";
  const humidityH1 = document.createElement("h1");
  humidityH1.textContent = `${obj.humidity} %`;
  // humidity append
  humidityDiv.appendChild(humidityP1);
  humidityDiv.appendChild(humidityH1);
  mainContainer.appendChild(humidityDiv);
  //
  // wind div
  const windDiv = document.createElement("div");
  windDiv.classList.add("windSpeed");
  const windp1 = document.createElement("p");
  windp1.classList.add("sublabel");
  windp1.textContent = "Wind";
  const windh1 = document.createElement("h1");
  if (useMetric) {
    windh1.textContent = `${obj.windSpeedKPH} KPH`;
  } else {
    windh1.textContent = `${obj.windSpeedMPH} MPH`;
  }
  // wind append
  windDiv.appendChild(windp1);
  windDiv.appendChild(windh1);
  mainContainer.appendChild(windDiv);
};
//// updateDisplay
//

const updateDisplay = (obj) => {
  const locationH1 = document.querySelector(".location > h1");
  locationH1.textContent = `${obj.cityName}, ${obj.countryName}`;
  const weatherImg = document.querySelector(".weatherIcon > img");
  weatherImg.src = `https:${obj.weatherIcon}`;
  const weatherDescriptionH1 = document.querySelector(
    ".weatherDescription > h1"
  );
  weatherDescriptionH1.textContent = `${obj.weatherDescription}`;
  const currentDateH1 = document.querySelector(".currentDate > h1");
  currentDateH1.textContent = `${obj.lastUpdated}`;
  const tempH1 = document.querySelector(".temperature > h1");
  if (useMetric) {
    tempH1.textContent = `${obj.tempC} °C`;
  } else {
    tempH1.textContent = `${obj.tempF} °F`;
  }
  const feelsLikeH1 = document.querySelector(".feelsLike > h1");
  if (useMetric) {
    feelsLikeH1.textContent = `${obj.feelsLikeC} °C`;
  } else {
    feelsLikeH1.textContent = `${obj.feelsLikeF} °F`;
  }
  const humidityH1 = document.querySelector(".humidity > h1");
  humidityH1.textContent = `${obj.humidity} %`;
  const windh1 = document.querySelector(".windSpeed > h1");
  if (useMetric) {
    windh1.textContent = `${obj.windSpeedKPH} KPH`;
  } else {
    windh1.textContent = `${obj.windSpeedMPH} MPH`;
  }
};
const makeSearch = async () => {
  const searchItem = searchBox.value;
  let data = await makeRequest(searchItem);
  let relevantData = selectRelevantData(data);
  setCurrentLocation(relevantData);
  updateDisplay(relevantData);
};

/// unit conversion functions
//
const switchToMetric = () => {
  useMetric = true;
  metricButton.classList.toggle("selected");
  imperialButton.classList.toggle("selected");
  displayInfo(currentLocation);
};
const switchToImperial = () => {
  useMetric = false;
  imperialButton.classList.toggle("selected");
  metricButton.classList.toggle("selected");
  displayInfo(currentLocation);
};
/////
// Error Handler:
const setErrorText = (txt) => {
  const errorField = document.querySelector(".errorField");
  const errorText = document.querySelector(".errorText");
  errorField.style.display = "flex";
  errorText.textContent = txt;
  /// set event listener that clears the error message when user starts typing
  const searchBox = document.getElementById("searchBox");
  searchBox.addEventListener("keypress", () => {
    resetErrorField();
  });
};
const resetErrorField = () => {
  const errorField = document.querySelector(".errorField");
  const errorText = document.querySelector(".errorText");
  const searchBox = document.getElementById("searchBox");
  errorField.style.display = "none";
  errorText.textContent = "";
  searchBox.removeEventListener("keypress", resetErrorField);
};
const errorHandler = (err) => {
  switch (err.cause) {
    case 400:
      setErrorText("Location does not exist");
      console.log("Error: 400 Bad request");
      break;
    case 401:
      setErrorText("Server error, try again!");
      console.log(
        "Developer only: Error: 401 Unauthorized, check authentication"
      );
      break;
    case 403:
      setErrorText("Server error, try again! later");
      console.log("Error: 403 Forbidden");
      break;
    case 404:
      setErrorText("Location does not exist");
      console.log("Error: 404 not found");
      break;
    case 500:
      setErrorText("Server error, try again! later");
      console.log("Error: 500 Internal server error");
      break;
    case 503:
      setErrorText("Server error, try again! later");
      console.log("Error: 503 service unavailable");
      break;
    default:
      console.log("pray to laaawd jeesus 🙏");
  }
};
/// show / hide loader function
//
const showLoader = () => {
  const loader = document.querySelector(".loader");
  const divs = document.querySelectorAll(".main_container > div");
  divs.forEach((div) => {
    div.style.display = "none";
  });
  loader.style.display = "block";
};
const hideLoader = () => {
  const loader = document.querySelector(".loader");
  const divs = document.querySelectorAll(".main_container > div");
  divs.forEach((div) => {
    if (div.className === "weatherIcon") {
      div.style.display = "flex";
    } else {
      div.style.display = "block";
    }
  });
  loader.style.display = "none";
};

/////// Event Listeners:
window.onload = async (event) => {
  let data = await makeRequest("New York");
  let relevantData = selectRelevantData(data);
  displayInfo(relevantData);
  setCurrentLocation(relevantData);
  console.log("page is fully loaded");
};
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  makeSearch();
});

metricButton.addEventListener("click", () => {
  switchToMetric();
});
imperialButton.addEventListener("click", () => {
  switchToImperial();
});
/* searchBox.addEventListener("")
 */
