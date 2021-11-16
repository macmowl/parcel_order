import '../styles/modal.scss';
import IOrder from "../types/order.type";

interface IProps {
	show: boolean,
	response: IOrder,
	
}

const Modal = (props: IProps) => {
	  return (
		<>
		 {
		 props.show ?
		 
		 <div
			className="modalContainer" 
		  >
			<div className="modal" >
			  <header className="modal_header">
				<h2 className="modal_header-title"> {props.response.message} </h2>
			  </header>
			  <main className="modal_content">
			  The package delivery will cost you:  {props.response.totalPrice} €
			  </main>
			  <footer className="modal_footer">
				<button className="modal-close" >
				  Close
				</button>
	
			  </footer>
			</div>
		  </div>
		  : null
		 }
		</>
	  );
	};

export default Modal;