import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ClientForm = () => {
	const initialState = {
		companyName: "",
		clientAddress: "",
	};
	const [formData, setFormData] = useState(initialState);

	const { companyName, clientAddress } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		setFormData(initialState);
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Create Client</h1>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Company Name"
						name="companyName"
						value={companyName}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Client Address"
						name="clientAddress"
						value={clientAddress}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<small>Note: This Page is not working right now.</small>
				<h2 className="text-primary">AddPerson Component</h2>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

export default connect(null)(withRouter(ClientForm));
