const apiKey = 'de6caf975ecf294524393c35547db499';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Get date with JS
let currentDate = new Date();
let newDate = currentDate.getMonth() + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
document.getElementById('header-date').innerHTML = newDate;

/* ################### Event listener on 'generate" button ################### */
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
  const journalPost = document.getElementById('feelings').value;
  const zipValue = document.getElementById('zip').value;

  // Validation to make sure user inputed values
  if (journalPost === '' || zipValue === '') {
    alert("Please enter a Zipcode and Jounrnal Entry before clicking submit");
    return console.log('Missing value(s). Journal post is holding: ' + journalPost + ', Zip is holding: ' + zipValue);
  }

  //Get API Data then update UI
  getApiData(baseURL, zipValue, apiKey).then(function(fahrenheitTemp) {
    postApiData('/add', {
      temperature: fahrenheitTemp + "f",
      date: newDate,
      userResponse: journalPost,
    });
    updateUI();
  })
};

/* ################### Get API Data ################### */
const getApiData = async (baseURL, zip, apiKey) => {
  // Form URL request. Example: http://api.openweathermap.org/data/2.5/weather?zip=91790,us&appid=de6caf975ecf294524393c35547db499
  const response = await fetch(baseURL + zip + ',us&appid=' + apiKey);
  // Getting values from response
  try {
    const webData = await response.json();
    // Get City name
    let city = webData.name;
    document.getElementById('city-name').innerHTML = city;
    // Get temperature, then convert temp from Kelvin to Fahrenheit
    let fahrenheitTemp = ((webData.main.temp - 273.15) * 9) / 5 + 32;
    fahrenheitTemp = fahrenheitTemp.toFixed(2);
    return fahrenheitTemp;
  } catch (error) {
    console.log("Error getting API data", error);
  }
};

/* ################### Post API Data ################### */
const postApiData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // Trying to get new data
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("Error posting API Data", error);
  }
};

/* ################### Functions Below ################### */
const updateUI = async () => {
  // Attempting to input values from API
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    const mostRecentRecord = allData[allData.length - 1];
    document.getElementById('date').innerHTML = mostRecentRecord.date;
    document.getElementById('temp').innerHTML = mostRecentRecord.temperature;
    document.getElementById('header-temp').innerHTML = mostRecentRecord.temperature;
    document.getElementById('content').innerHTML = mostRecentRecord.userResponse;
  } catch (error) {
    console.log("Error updateing UI", error);
  }
};
