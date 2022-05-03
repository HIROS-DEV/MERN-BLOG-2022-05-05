import { useState, useContext, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import BlogEditAndDelete from './BlogEditAndDelete';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Loadingspinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './BlogDetailItem.css';

const BlogDetailItem = ({
	id,
	image,
	title,
	description,
	creatorId,
}) => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const [showConfirmModal, setShowConfirmModal] = useState(false);
	
	const { error, isLoading, sendRequest, clearError } =
		useHttpClient();

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
				`http://localhost:5000/api/blogs/${id}`,
				'DELETE',
				null,
				{ Authorization: `Bearer ` + auth.token }
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
				{auth.userId === creatorId && (
					<BlogEditAndDelete
						id={id}
						onDelete={showDeleteWarningHandelr}
					/>
				)}
				<img src={`${image}`} alt={title} />
				<p>&nbsp;{description}</p>
			</div>
		</>
	);
};
export default memo(BlogDetailItem);
