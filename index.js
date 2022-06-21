const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('174.88.192.201', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coords:' , coordinates);
// });

// const coords = {
//   latitude: "44.60136032104492",
//   longitude: "-79.35980224609375",
// };

// fetchFlyoverTimes(coords, (error, passTimes) => {
//   if (error) {
//     console.log(`It didn't work!`, error);
//     return;
//   }
//   console.log(`It worked! Returned flyover times;`, passTimes);
// });

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(pass.risetime * 1000);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log(`It didn't work!`, error);
  }
  printPassTimes(passTimes);
});
