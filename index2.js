const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(passTimes => {
    for (time of passTimes.response) {
      console.log(`Next pass ${Date(time.risetime)} for ${time.duration} seconds!`);
    }
  })
  .catch(error => {
    console.log(`it didn't work: ${error.message}`);
  });
