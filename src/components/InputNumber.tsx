import React from "react";

interface IProps {
	placeholder: string,
	value: number,
	onChange: any,
	name_id_for: string,
	label: string
}

const InputNumber: React.FC<IProps> = (props) => {
	return (
		<div className="field">
				<input
					type="number"
					placeholder="kg"
					value={props.value || ""}
					onChange={props.onChange}
					name={props.name_id_for}
					id={props.name_id_for}
					required
				/>
				<label htmlFor={props.name_id_for}>{props.label}</label>
			</div>
	)
}

export default InputNumber;