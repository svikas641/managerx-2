const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const app = express();
const Client = require("../../models/Client");
const Prospect = require("../../models/Prospect");
const User = require("../../models/User");

// @route   POST api/client/
// @desc    add a new client
// @access  Private

router.post("/addClient", auth, checkRole, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const newClient = new Client({
      user: req.user.id,
      clientName: req.body.clientName,
      clientAddress: req.body.clientAddress,
      type: req.body.type,
      personDetails: req.body.personDetails,
      createdBy: user.name,
    });

    const client = await newClient.save();

    res.json(client);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/client/
// @desc    get all the clients
// @access  Private

router.get("/", auth, checkRole, async (req, res) => {
  try {
    const clients = await Client.find().sort({ date: -1 });
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/client/
// @desc    get all the clients
// @access  Private

router.get("/getProspect", auth, checkRole, async (req, res) => {
  try {
    const prospects = await Prospect.find().sort({ date: -1 });
    res.json(prospects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get a single client by objectid

router.get("/:id", auth, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !client) {
      return res.status(404).json({ msg: "Client not found" });
    }

    res.json(client);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
