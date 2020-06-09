const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignedDutiesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  client: {
    type: String,
  },
  salesPerson: {
    type: String,
  },
  prospect: {
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
