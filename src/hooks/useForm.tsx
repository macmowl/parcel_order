import React, {useState} from 'react';

const useForm = () => {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	
	const handleChange = (e: any): void => {
			setOrder({
				...order,
				[e.target.name]: e.target.value,	
			});
		}
	
	return {
		values,
		errors
	}
}

export default useForm;