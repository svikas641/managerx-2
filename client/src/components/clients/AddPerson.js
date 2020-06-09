import React, { Fragment } from "react";

const AddPerson = () => {
	return (
		<Fragment>
			<h1 className="text-primary">AddPerson Component</h1>
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
						placeholder="Company Name"
						name="companyName"
						value={companyName}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
			</form>
		</Fragment>
	);
};

export default AddPerson;
