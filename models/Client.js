const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientAddress: {
    type: String,
    required: true,
  },
  personDetails: [
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Client = mongoose.model("client", ClientSchema);
