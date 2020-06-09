import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { assignProspect } from "../../actions/duty";

const ProspectDuty = ({ prospects, users, assignProspect, history }) => {
	const initialState = {
		prospect: "",
		salesPerson: "",
	};
	const [formData, setFormData] = useState(initialState);

	const { prospect, salesPerson } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		assignProspect(formData, history);
		setFormData(initialState);
	};

	return (
		<Fragment>
			<div className="post-form">
				<div className="bg-primary p">
					<h3>For Prospect Visit</h3>
				</div>
				<form className="form my-1" onSubmit={onSubmit}>
					<select
						className="form-group"
						name="prospect"
						value={prospect}
						onChange={onChange}
					>
						<option value="0">* Select Prospect</option>
						{prospects.map((prospect) => (
							<option key={prospect._id} value={prospect}>
								{prospect.companyName}
							</option>
						))}
					</select>
					<select
						className="form-group"
						name="salesPerson"
						value={salesPerson}
						onChange={onChange}
					>
						<option value="0">* Select Sales Person</option>
						{users.map((user) => (
							<option key={user._id} value={user.name}>
								{user.name}
							</option>
						))}
					</select>
					<input
						type="submit"
						className="btn btn-dark my-1"
						value="Submit"
					/>
					<Link className="btn btn-light my-1" to="/dashboard">
						Go Back
					</Link>
				</form>
			</div>
		</Fragment>
	);
};

ProspectDuty.propTypes = {
	assignProspect: PropTypes.func.isRequired,
};

export default connect(null, { assignProspect })(ProspectDuty);
