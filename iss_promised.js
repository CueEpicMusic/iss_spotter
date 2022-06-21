const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(
    `https://api.ipbase.com/v2/info?apikey=F9g8o6N7Z1Cg6ZayCcPYIEQPBEBtJgbFuKh7cEbH&ip=${ip}`
  );
};

const fetchFlyoverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body).data.location;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchFlyoverTimes)
  .then((data) => {
    const response  = JSON.parse(data).response;
    return response;
  })
}

module.exports = { nextISSTimesForMyLocation };
