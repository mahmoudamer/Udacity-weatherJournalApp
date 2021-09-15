/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const appId = "fff74ca0f4a3cb0085b2f6781d97098d";

// function to get URL
const getURL = (zipCode, apiKey) =>
  `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

// server
const server = "http://localhost:3001";

// post data
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// get data
const getData = async (url = "") => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//  get weather data from API
const getWeatherData = async (zip) => {
  try {
    const res = await fetch(getURL(zip, appId));
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// update UI
const updateUI = (res) => {
  document.getElementById("date").innerText = res.date;
  document.getElementById("temp").innerText = res.temp;
  document.getElementById("content").innerText = res.userResponse;
};

// get data then submit them to server
const submitData = () => {
  const zipCodeInput = document.getElementById("zip").value;
  const feelingsInput = document.getElementById("feelings").value;

  getWeatherData(zipCodeInput).then((res) => {
    postData(server + "/data", {
      date: newDate,
      temp: res.main.temp,
      userResponse: feelingsInput,
    }).then((res) => getData("/data").then((res) => updateUI(res)));
  });
};

// event listener to add function to html dom button
document.getElementById("generate").addEventListener("click", submitData);
