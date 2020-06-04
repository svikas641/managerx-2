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
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  clientPhoneNumber: {
    type: Number,
    required: true,
  },
  clientAddress: {
    type: String,
    required: true,
  },
  latLng: {
    type: [Object],
    blackbox: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  salesPerson: {
    type: String,
    required: true,
  },
  visits: [
    {
      commentBox: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
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
