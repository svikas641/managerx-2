const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProspectSchema = new Schema({
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
	personDetails: [
		{
			name: {
				type: String,
			},
			email: {
				type: String,
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
