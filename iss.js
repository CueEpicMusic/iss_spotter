const request = require("request");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// const fetchMyIP = function (callback) {
//   // use request to fetch IP address from JSON API
//   request.get(`https://api.ipify.org?format=json`, (error, response, body) => {
//     if (error) {
//       return callback(error, null);
//     }
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
// const fetchCoordsByIP = function (ip, callback) {
//   request(
//     `https://api.ipbase.com/v2/info?apikey=F9g8o6N7Z1Cg6ZayCcPYIEQPBEBtJgbFuKh7cEbH&ip=${ip}`,
//     (error, response, body) => {
//       if (error) {
//         callback(error, null);
//         return;
//       }
//       if (response.statusCode !== 200) {
//         const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
//         callback(Error(msg), null);
//         return;
//       }
//       const { latitude, longitude } = JSON.parse(body).data.location;
//       callback(null, { latitude, longitude });
//     }
//   );
// };

const fetchFlyoverTimes = function (coords, callback) {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS passes times: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const passes = JSON.parse(body).response;
      callback(null, passes);
    }
  );
};

module.exports = { fetchFlyoverTimes };
