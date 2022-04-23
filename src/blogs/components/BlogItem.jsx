import { useState, useContext, memo } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Loadingspinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './BlogItem.css';

const BlogItem = (props) => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();
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
			props.onDelete(props.id);
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
			<li
				className={
					props.index % 2 === 0
						? `blogItem__li`
						: `blogItem__li reverse`
				}
			>
				{isLoading && <Loadingspinner asOverlay />}
				<div className='blogItem__imgContainer'>
					<Link to={`/blog/${props.id}`}>
						<img src={`http://localhost:5000/${props.image}`} alt={props.title} />
					</Link>
				</div>
				<div className='blogItem__summaryContainer'>
					<div className='blogItem__itemContainer'>
						<div className='blogItem__itemWrapper'>
							<img
								src={`http://localhost:5000/${props.avatar}`}
								alt='avatar'
								className='blogItem__avatar'
							/>
							<p>{props.creator}</p>
						</div>
						<div className='blogItem__itemWrapper'>
							<i className='fa-solid fa-calendar-days'></i>
							<p>{props.createdAt}</p>
						</div>
						<div className='blogItem__itemWrapper'>
							<Link to={`/blog/${props.id}`}>
								<i className='fa-solid fa-comment'></i>
								{/* TODO: show comments length from props*/}
								<p>3</p>
							</Link>
						</div>
						{auth.userId === props.creatorId && (
							<div className='blogItem__itemWrapper'>
								<Link to={`/blog/edit/${props.id}`}>
									<i className='fa-solid fa-pen-to-square'></i>
								</Link>
								<i
									className='fa-solid fa-trash'
									onClick={showDeleteWarningHandelr}
								></i>
							</div>
						)}
					</div>
					<Link to={`/blog/${props.id}`}>
						<h1>{props.title}</h1>
					</Link>
					<p>{props.description}</p>
					<Button to={`/blog/${props.id}`}>
						SEE MORE<i className='fa-solid fa-arrow-right-long'></i>
					</Button>
				</div>
			</li>
		</>
	);
};
export default memo(BlogItem);
