import React, { useState, useEffect } from "react";
import IPackage from "../types/package.type";
import IOrder from "../types/order.type";
import Modal from "../components/Modal";
import axios, {AxiosResponse} from 'axios';
import InputSelect from "../components/InputSelect";
import useForm from "../hooks/useForm";

const PackageForm = () => {
	const [orderRes, setOrderRes] = useState<IOrder>({
		success: false,
		message: "",
		totalPrice: 0
	});
	const [prices, setPrices] = useState({});
	const [order, setOrder] = useState<IPackage>(
		{
			countryFrom: "FR",
			countryTo: "LX",
			packages: [
				{
					width: null,
					weight: null,
					length: null,
					height: null,
				}
			]
		}
	);
	const [modal, setModal] = useState(false);
	const Toggle = () => setModal(!modal);
	
	const addPackage = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		let temp = {...order};
		temp.packages.push(
			{
				width: 0,
				weight: 0,
				length: 0,
				height: 0,
			}
		);
		setOrder(temp);
	}
	
	const deletePackage = (e: React.MouseEvent<HTMLButtonElement>, i:number): void => {
		e.preventDefault();
		let temp = {...order};
		temp.packages.splice(i, 1);
		setOrder(temp);
	}
	
	useEffect(() => {
		axios
			.post('http://localhost:8000/api/quote', order)
			.then((response: AxiosResponse) => {
				console.log(response.data);
				setPrices(response.data.quote);
			})
			.catch(error => {
				console.log(error);
			});
	}, [order]);
	
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setOrder({
			...order,
			[e.target.name]: e.target.value,	
		});
	}
	
	const handlePackageChange = (e: React.ChangeEvent<HTMLInputElement>, i: number): void => {
		let temp = {...order};
		// eslint-disable-next-line
		{/* temp.packages[i][e.target.name] = e.target.value; */}
		
		switch(e.target.name) {
			case 'width':
				temp.packages[i]["width"] = +e.target.value;
				break;
			case 'weight':
				temp.packages[i]["weight"] = +e.target.value;
				break;
			case 'height':
				temp.packages[i]["height"] = +e.target.value;
				break;
			case 'length':
				temp.packages[i]["length"] = +e.target.value;
				break;
		}
		setOrder(temp);
	
	}
	
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		axios
			.post('http://localhost:8000/api/order', order)
			.then((response: AxiosResponse) => {
				console.log(response);
				setOrderRes(response.data);
				Toggle();
			}).catch(error => {
				console.log(error);
			});
	}
	
	return (
		<form className="package_form">
			<div className="countries">
				<InputSelect value={order.countryFrom} onChange={handleChange} name_id_for="countryFrom" label="From:"/>
				<InputSelect value={order.countryTo} onChange={handleChange} name_id_for="countryTo" label="To:"/>
			</div>
			<ul>
			{
				order.packages.map((item, i: number) => {
					return(
						<li key={i} className="package">
							<p>Package {i+1}</p>
							<div className="field">
								<input
									type="number"
									placeholder="kg"
									value={item.weight || ""}
									onChange={e => handlePackageChange(e, i)}
									name="weight"
									id="weight"
								/>
								<label htmlFor="weight">Weight: </label>
							</div>
							<div className="field">
								<input
									type="number"
									placeholder="cm"
									value={item.height || ""}
									onChange={e => handlePackageChange(e, i)}
									name="height"
									id="height"
								/>
								<label htmlFor="height">Height: </label>
							</div>
							<div className="field">
								<input
									type="number"
									placeholder="cm"
									value={item.width || ""}
									onChange={e => handlePackageChange(e, i)}
									name="width"
									id="width"
								/>
								<label htmlFor="width">Width: </label>
							</div>
							<div className="field">
								<input
									type="number"
									placeholder="cm"
									value={item.length || ""}
									onChange={e => handlePackageChange(e, i)}
									name="length"
									id="length"
								/>
								<label htmlFor="length">Length: </label>
							</div>
							<div className="field">
								
							</div>
							<button className="package__delete" onClick={e => deletePackage(e, i)}>
								<svg className="delete__icon" version="1.1" id="Capa_1" 	 width="488.936px" height="488.936px" viewBox="0 0 488.936 488.936">
								<g>
									<g>
										<path d="M381.16,111.948H107.376c-6.468,0-12.667,2.819-17.171,7.457c-4.504,4.649-6.934,11.014-6.738,17.477l9.323,307.69
											c0.39,12.92,10.972,23.312,23.903,23.312h20.136v-21.012c0-24.121,19.368-44.049,43.488-44.049h127.896
											c24.131,0,43.893,19.928,43.893,44.049v21.012h19.73c12.933,0,23.52-10.346,23.913-23.268l9.314-307.7
											c0.195-6.462-2.234-12.863-6.738-17.513C393.821,114.767,387.634,111.948,381.16,111.948z"/>
										<path d="M309.166,435.355H181.271c-6.163,0-11.915,4.383-11.915,11.516v30.969c0,6.672,5.342,11.096,11.915,11.096h127.895
											c6.323,0,11.366-4.773,11.366-11.096v-30.969C320.532,440.561,315.489,435.355,309.166,435.355z"/>
										<path d="M427.696,27.106C427.696,12.138,415.563,0,400.591,0H88.344C73.372,0,61.239,12.138,61.239,27.106v30.946
											c0,14.973,12.133,27.106,27.105,27.106H400.59c14.973,0,27.105-12.133,27.105-27.106L427.696,27.106L427.696,27.106z"/>
									</g>
								</g>
								</svg>
									
							</button>
							<hr />
						</li>
					)
				})
			}
			</ul>
			<div className="buttons">
				<button className="addPackage" onClick={e => addPackage(e)}>Add a new package</button>
				<button
					className="saveButton"
					onClick={handleClick}
				>
					Make an order
				</button>
				<Modal show={modal} response={orderRes}/>
			</div>
			
		</form>
	)
}

export default PackageForm;