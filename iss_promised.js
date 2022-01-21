const request = require('request-promise-native');    // request-promise-native is alternative to request -> request does not support promises

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = body => {
  return request(`https://api.freegeoip.app/json/${JSON.parse(body).ip}?apikey=817c8770-7a10-11ec-b9f3-033d4be4fa33`);
};

const fetchISSFlyOverTimes = body => {
  coords = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => JSON.parse(data));
};

module.exports = { nextISSTimesForMyLocation };
