const distance = require("google-distance");
const config = require("config");

module.exports = function DistanceController(
	origin,
	destination,
	mode = "driving"
) {
	distance.apiKey = config.get("distanceMapKey");
	return new Promise((resolve, reject) => {
		distance.get(
			{
				mode: mode,
				origin: origin,
				destinations: destination,
			},
			(error, data) => {
				if (error) reject(error);
				resolve(data);
			}
		);
	});
};
