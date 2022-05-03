import { useState, useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { useParallax } from 'react-scroll-parallax';

import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Loadingspinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './BlogItem.css';
import BlogEditAndDelete from './BlogEditAndDelete';

const BlogItem = ({
	id,
	index,
	image,
	title,
	avatar,
	creator,
	onDelete,
	createdAt,
	creatorId,
	description,
	comments,
}) => {
	const auth = useContext(AuthContext);
	const { ref } = useParallax({ speed: 15 });

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
				`http://localhost:5000/api/blogs/${id}`,
				'DELETE',
				null,
				{ Authorization: `Bearer ` + auth.token }
			);
			onDelete(id);
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
					index % 2 === 0 ? `blogItem__li` : `blogItem__li reverse`
				}
			>
				{isLoading && <Loadingspinner asOverlay />}
				<div ref={ref} className='blogItem__imgContainer'>
					<Link to={`/blog/${id}`}>
						<img src={`${image}`} alt={title} />
					</Link>
				</div>
				<div className='blogItem__summaryContainer'>
					<div className='blogItem__itemContainer'>
						<div className='blogItem__itemWrapper'>
							<img
								src={`${avatar}`}
								alt='avatar'
								className='blogItem__avatar'
							/>
							<p>{creator}</p>
						</div>
						<div className='blogItem__itemWrapper'>
							<i className='fa-solid fa-calendar-days'></i>
							<p>{createdAt}</p>
						</div>
						<div className='blogItem__itemWrapper'>
							<Link to={`/blog/${id}`}>
								<i className='fa-solid fa-comment'></i>
								<p>{comments.length}</p>
							</Link>
						</div>
						{auth.userId === creatorId && (
							<BlogEditAndDelete
								id={id}
								onDelete={showDeleteWarningHandelr}
							/>
						)}
					</div>
					<Link to={`/blog/${id}`}>
						<h1>{title}</h1>
					</Link>
					<p>{description}</p>
					<Button to={`/blog/${id}`}>
						SEE MORE<i className='fa-solid fa-arrow-right-long'></i>
					</Button>
				</div>
			</li>
		</>
	);
};
export default memo(BlogItem);
