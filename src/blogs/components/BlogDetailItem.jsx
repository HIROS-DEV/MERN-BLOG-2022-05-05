import { useState, useContext, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './BlogDetailItem.css';
import Loadingspinner from '../../shared/components/UIElements/LoadingSpinner';

const BlogDetailItem = (props) => {
	const navigate = useNavigate();
	const { error, isLoading, sendRequest, clearError } =
		useHttpClient();
	const auth = useContext(AuthContext);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const showDeleteWarningHandelr = () => {
		setShowConfirmModal(true);
	};
	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};
	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				`http://localhost:5000/api/blogs/${props.id}`,
				'DELETE'
			);
			navigate('/');
		} catch (err) {}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
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
				{isLoading && <Loadingspinner asOverlay />}
				{auth.userId === props.creatorId && (
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
				{/*********** MongoDB + Local image **********/}
				{/* <img src={`http://localhost:5000/${props.image}`} alt={props.title} /> */}
				{/********************************************/}

				{/*********** MongoDB + Cloudinary image **********/}
				<img src={`${props.image}`} alt={props.title} />
				{/********************************************/}
				<p>&nbsp;{props.description}</p>
			</div>
		</>
	);
};
export default memo(BlogDetailItem);
