const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const app = express();
const AssignedDuty = require("../../models/AssignedDuties");
const User = require("../../models/User");
const axios = require("axios");

// @route   POST api/duties/
// @desc    assign new duty
// @access  Private

router.post("/assignDuty", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const newDuty = new AssignedDuty({
      user: req.user.id,
      client: req.body.client,
      prospect: req.body.prospect,
      salesPerson: req.body.salesPerson,
    });

    const duty = await newDuty.save();

    res.json(duty);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// get All duties by logged in user

router.get("/", auth, async (req, res) => {
  try {
    const duties = await AssignedDuty.find({ salesPerson: req.user.id }).sort({
      date: -1,
    });
    res.json(duties);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// populate Lead Test
router.get("/populateLead", auth, async (req, res) => {
  try {
    const users = await axios.get("http://localhost:5000/api/duties");
    res.json(users);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
