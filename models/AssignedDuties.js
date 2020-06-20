const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignedDutiesSchema = new Schema({
  duty: {
    type: String,
  },
  salesPerson: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = AssignedDuty = mongoose.model(
  "assignedDuty",
  AssignedDutiesSchema
);
