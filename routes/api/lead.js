const express = require("express");
const router = express.Router();
const fs = require("fs");
const auth = require("../../middleware/auth");
const sendEmail = require("../../middleware/email");
const { check, validationResult } = require("express-validator");
const Lead = require("../../models/Lead");
const User = require("../../models/User");
const Client = require("../../models/Client");
const AssignedDuty = require("../../models/AssignedDuties");

// TODO: VALIDATION

// @route   GET api/lead/me
// @desc    get all leads by a user
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const duties = await AssignedDuty.find({ salesPerson: req.user.id });

    const clients = [];
    duties.forEach((element) => clients.push(element.duty));

    const docs = await Client.find({
      _id: { $in: clients },
    });

    const newArr = docs.map((obj) => ({
      ...obj._doc,
      salesPerson: req.user.id,
    }));

    await Lead.insertMany(newArr);

    await AssignedDuty.deleteMany({ salesPerson: req.user.id });

    const leads = await Lead.find({ salesPerson: req.user.id }).sort({
      date: -1,
    });
    res.json(leads);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/lead/pending
// @desc    get all pending leads by a user
// @access  Private

router.get("/pending", auth, async (req, res) => {
  try {
    const leads = await Lead.find({
      salesPerson: req.user.id,
      $and: [{ finalStatus: "pending" }],
    }).sort({
      date: -1,
    });
    res.json(leads);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/lead/:id
// @desc     Get lead by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !lead) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    res.json(lead);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    POST api/lead/feedback/:id
// @desc     add feedback on a lead
// @access   Private
router.post("/feedback/:id", [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const lead = await Lead.findById(req.params.id);

    const newVisit = {
      commentBox: req.body.commentBox,
      status: req.body.status,
      email: req.body.email,
      lat: req.body.lat,
      lng: req.body.lng,
    };

    //Send Email Functionality
    // Change readFileSync to readFile

    var template = req.body.status;
    var subject = "";

    switch (template) {
      case "Met":
        var htmlTemplate = fs
          .readFileSync("./routes/api/email_templates/met.html")
          .toString();
        subject = "Thank you: For your valuable time.";
        lead.visits.unshift(newVisit);
        await lead.save();
        res.json(lead.visits);
        console.log("Met");
        break;
      case "Not_met":
        var htmlTemplate = fs
          .readFileSync("./routes/api/email_templates/not_met.html")
          .toString();
        subject = "Meeting Not held.";
        lead.visits.unshift(newVisit);
        await lead.save();
        res.json(lead.visits);
        console.log("Not met");
        break;
      case "Close_Lead":
        await Lead.findOneAndUpdate(
          {
            $and: [
              { _id: req.params.id },
              { finalStatus: { $ne: "Lead closed" } },
            ],
          },
          { $set: { finalStatus: "Lead closed" } },
          { returnNewDocument: true }
        );
        res.json("Lead final status updated");
        console.log("Lead Closed");
        break;
      case "Done":
        await Lead.findOneAndUpdate(
          { $and: [{ _id: req.params.id }, { finalStatus: { $ne: "Done" } }] },
          { $set: { finalStatus: "Done" } },
          { returnNewDocument: true }
        );
        res.json("Lead final status updated");
        console.log("Lead Done");
        break;
      default:
        console.log("None Selected");
    }

    const toEmail = req.body.email;
    const fromEmail = user.email;
    const fromName = user.name;
    const contentValue = htmlTemplate;

    sendEmail(toEmail, subject, fromEmail, fromName, contentValue);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
