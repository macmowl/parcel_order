import React, { useState, useEffect } from "react";
import ICountries from "../types/countries.type";
import axios, {AxiosResponse} from 'axios';

interface IProps {
	value: string;
	onChange: any,
	name_id_for: string,
	label: string,
}

const InputSelect: React.FC<IProps> = (props) => {
	const [countries, setCountries] = useState<Array<ICountries>>([]);
	
	useEffect(() => {
			getCountries();
		}, []);
		
	const getCountries = () => {
			let countriesArray: Array<ICountries> = [];
				
			axios
				.get('http://localhost:8000/api/countries')
				.then((response: AxiosResponse) => {
					response.data.forEach( (country:any) => {
							countriesArray.push({
								id: country.id,
								name: country.name
							})
						});
						setCountries(countriesArray);
				})
				.catch(error => {
					console.log(error);
				});
		}
	return(
		<div className="field">
			<select
				value={props.value}
				onChange={props.onChange}
				name={props.name_id_for}
				id={props.name_id_for}
			>
				{countries.map( (country:ICountries, index: number) => {
					return(
						<option value={country.id} key={index}>{country.name}</option>
					)
				})}
			</select>
			<label htmlFor={props.name_id_for}>{props.label}</label>
		</div>
	);
}

export default InputSelect;