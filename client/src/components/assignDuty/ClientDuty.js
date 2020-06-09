import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { assignClient } from "../../actions/duty";

const ClientDuty = ({ clients, users, assignClient, history }) => {
	const initialState = {
		client: "",
		salesPerson: "",
	};
	const [formData, setFormData] = useState(initialState);

	const { client, salesPerson } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		assignClient(formData, history);
		setFormData(initialState);
	};

	return (
		<Fragment>
			<div className="post-form">
				<div className="bg-primary p">
					<h3>For Client Visit</h3>
				</div>
				<form className="form my-1" onSubmit={onSubmit}>
					<select
						className="form-group"
						name="client"
						value={client}
						onChange={onChange}
					>
						<option value="0">* Select Client</option>
						{clients.map((client) => (
							<option key={client._id} value={client._id}>
								{client.companyName}
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
							<option key={user._id} value={user._id}>
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

ClientDuty.propTypes = {
	assignClient: PropTypes.func.isRequired,
};

export default connect(null, { assignClient })(ClientDuty);
