const express = require("express");
const router = express.Router();
const Mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const AssignedDuty = require("../../models/AssignedDuties");
const User = require("../../models/User");
const Client = require("../../models/Client");
const Lead = require("../../models/Lead");

// @route   POST api/duties/
// @desc    assign new duty
// @access  Private

router.post("/assignDuty", auth, async (req, res) => {
  try {
    dutyArray = req.body.duty;

    const resp = dutyArray.flatMap((arr) => arr).map(({ value }) => value);

    const docs = await Lead.find({
      _id: { $in: resp },
    });
    const msg = [];

    resp.forEach(async (id) => {
      const doc = docs.find((d) => d._id == id);

      if (doc) {
        msg.push(`Lead already exist for - ${doc.clientName}`);
      } else {
        msg.push(`Lead Successfully Added`);
        const newDuty = new AssignedDuty({
          duty: id,
          salesPerson: req.body.salesPerson,
        });

        await newDuty.save();
      }
    });

    res.json(msg);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// get All duties by logged in user

router.get("/", async (req, res) => {
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

module.exports = router;
