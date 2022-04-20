import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import './BlogDetailItem.css';

const BlogDetailItem = (props) => {
	const auth = useContext(AuthContext);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const showDeleteWarningHandelr = () => {
		setShowConfirmModal(true);
	};
	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};
	const confirmDeleteHandler = () => {
		console.log('DELETE...');
		setShowConfirmModal(false);
	};

	return (
		<>
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header='Are you sure?'
				footerClass='blog__modal-actions'
				footer={
					<>
						<Button inverse onClick={cancelDeleteHandler}>
							CANCEL
						</Button>
						<Button inverse onClick={confirmDeleteHandler}>
							DELTE
						</Button>
					</>
				}
			>
				<p>
					Do you want to proceed and delete this blog? Please note
					that it can't be undone thereafter.
				</p>
			</Modal>
			<div className='blogDetail__item'>
				{auth.isLoggedIn && (
					<div className='blogDetail__icons'>
						<Link to={`/blog/edit/${props.id}`}>
							<i className='fa-solid fa-pen-to-square'></i>
						</Link>
						<i
							className='fa-solid fa-trash'
							onClick={showDeleteWarningHandelr}
						></i>
					</div>
				)}
				<img src={props.image} alt={props.title} />
				<p>&nbsp;{props.description}</p>
			</div>
		</>
	);
};
export default BlogDetailItem;
