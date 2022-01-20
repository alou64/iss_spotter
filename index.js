const { nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log(error);
    return;
  }
  for (time of passTimes) {
    console.log(`Next pass ${Date(time.risetime)} for ${time.duration} seconds!`);
  }
});
