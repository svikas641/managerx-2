const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignedDutiesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  client: {
    type: Array,
  },
  salesPerson: {
    type: String,
  },
  prospect: {
    type: Array,
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
