const express = require("express");
const router = express.Router();
const DistanceController = require("../../controller/DistanceController");
const mode = ["bycicling", "walking", "driving"];

router.post("/location", (req, res) => {
	const isValid = typeof req.body.origin === "string";
	if (!isValid) res.status(500).send("Server Error");
	if (mode[req.body.mode] !== undefined) req.body.mode = "driving";
	DistanceController(req.body.origin, req.body.destination, req.body.mode)
		.then((result) => {
			res.json(result);
		})
		.catch((errResult) => {
			console.log(errResult);
			res.status(500).send("Main Server Error");
		});
});

router.post("/coordinates", (req, res) => {
	if (mode[req.body.mode] !== undefined) req.body.mode = "driving";
	DistanceController(req.body.origin, req.body.destination, req.body.mode)
		.then((result) => {
			res.json(result);
		})
		.catch((errResult) => {
			console.log(errResult);
			res.status(500).send("Main Server Error");
		});
});

module.exports = router;
