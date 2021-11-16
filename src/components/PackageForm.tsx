import React, { useState, useEffect } from "react";
import IPackage from "../types/package.type";
import IOrder from "../types/order.type";
import Modal from "../components/Modal";
import axios, {AxiosResponse} from 'axios';
import InputSelect from "../components/InputSelect";
import InputNumber from "../components/InputNumber";
import DelPackageButton from "../components/DeletePackageButton";


const PackageForm: React.FC = () => {
	const [orderRes, setOrderRes] = useState<IOrder>({
		success: false,
		message: "",
		totalPrice: 0
	});
	const [prices, setPrices] = useState({
		totalPrice: 0,
		packages: [
			{
				price: 0,
			}
		]
	});
	const [disabled, setDisabled] = useState(true);
	const [order, setOrder] = useState<IPackage>(
		{
			countryFrom: "FR",
			countryTo: "LX",
			packages: [
				{
					width: 0,
					weight: 0,
					length: 0,
					height: 0,
				}
			]
		}
	);
	
	const [modal, setModal] = useState(false);
	const Toggle = () => setModal(!modal);
	
	useEffect(() => {
		axios
		.post('http://localhost:8000/api/quote', order)
		.then((response: AxiosResponse) => {
			setPrices(response.data.quote);
			setDisabled(false);
		})
		.catch((error) => {
			if (error.response) {
				setDisabled(true);
			}
		});
	}, [order]);

	
	const addPackage = (e: any): void => {
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
		
		let temp2 = {...prices};
		temp2.packages.push({
			price: 0,
		});
		setPrices(temp2);
	}
	
	const deletePackage = (e: any, i:number): void => {
		e.preventDefault();
		let temp = {...order};
		temp.packages.splice(i, 1);
		setOrder(temp);
		let temp2 = {...prices};
		temp2.packages.splice(i, 1);
		setPrices(temp2);
	}
	
	// function to manage select boxes changes
	const handleChange = (e: any): void => {
		setOrder({
			...order,
			[e.target.name]: e.target.value,	
		});
	}
	
	//function to manage number inputs changes
	const handlePackageChange = (e: any, i: number): void => {
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
	
	const handleClick = (e: any): void => {
		e.preventDefault();
		axios
			.post('http://localhost:8000/api/order', order)
			.then((response: AxiosResponse) => {
				setOrderRes(response.data);
				Toggle();
			}).catch((error) => {
				if (error.response) {
					console.log(error.response.data.errors);
				}
			});
	}
	
	return (
		<form className="package_form" noValidate onSubmit={handleClick}>
			<div className="countries">
				<InputSelect value={order.countryFrom} onChange={handleChange} name_id_for="countryFrom" label="From:"/>
				<InputSelect value={order.countryTo} onChange={handleChange} name_id_for="countryTo" label="To:"/>
			</div>
			<ul>
			{
				order.packages.map((item, i: number) => {
					return(
						<li key={i} className="package">
							<InputNumber 
								placeholder="kg"
								value={item.weight}
								onChange={(e: any) => handlePackageChange(e, i)}
								name_id_for="weight" label="Weight:"
							/>
							<InputNumber 
								placeholder="cm"
								value={item.height}
								onChange={(e: any) => handlePackageChange(e, i)}
								name_id_for="height" label="Height:"
							/>
							<InputNumber 
								placeholder="cm"
								value={item.width}
								onChange={(e: any) => handlePackageChange(e, i)}
								name_id_for="width" label="Width:"
							/>
							<InputNumber 
								placeholder="cm"
								value={item.length}
								onChange={(e: any) => handlePackageChange(e, i)}
								name_id_for="length" label="Length:"
							/>
							<div className="field">
								<div className="field__price">
									<p className="field__price-p">{prices.packages[i].price} €</p>
									<p><span className="label">Price: </span></p>
								</div>
								
							</div>
							<DelPackageButton onClick={(e: any) => deletePackage(e, i)}/>
						</li>
					)
				})
			}
			</ul>
			<div className="buttons">
				<button className="buttons__addPackage" onClick={e => addPackage(e)}>Add a new package</button>
				<div className="buttons__price">
					<button className="saveButton" type="submit" disabled={disabled}>
							Make an order
						</button>
					<p>Total price: <strong>{prices.totalPrice} €</strong></p>
				</div>
				
			</div>
			<Modal show={modal} response={orderRes}/>
			
		</form>
	)
}

export default PackageForm;