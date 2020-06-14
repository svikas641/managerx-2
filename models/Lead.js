const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  personDetails: {
    type: Array,
    required: true,
  },
  visits: [
    {
      commentBox: {
        type: String,
      },
      status: {
        type: String,
      },
      clientName: {
        type: String,
      },
      clientEmail: {
        type: String,
      },
      clientPhoneNumber: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  finalStatus: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Lead = mongoose.model("lead", LeadSchema);
