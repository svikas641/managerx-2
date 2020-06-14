const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProspectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  prospectName: {
    type: String,
    required: true,
  },
  prospectAddress: {
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

module.exports = Prospect = mongoose.model("prospect", ProspectSchema);
