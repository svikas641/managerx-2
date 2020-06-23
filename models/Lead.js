const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "client",
  },
  clientName: {
    type: String,
  },
  clientAddress: {
    type: String,
  },
  personDetails: {
    type: Array,
  },
  type: {
    type: String,
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
      lat: {
        type: Number,
      },
      lng: {
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
  salesPerson: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Lead = mongoose.model("lead", LeadSchema);
