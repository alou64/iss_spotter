request = require('request');


const fetchMyIP = callback => {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // handle server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body).ip);
  });
};


const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.freegeoip.app/json/${ip}?apikey=817c8770-7a10-11ec-b9f3-033d4be4fa33`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};


const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover time. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body).response);
  });
};


// fetchMyIP -> fetchCoordsByIP -> fetchISSFlyOverTimes -> callback
const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) return callback(error, null);
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) return callback(error, null);
        callback(null, times)
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };
