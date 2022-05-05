import { useState, memo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Loadingspinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';

import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import './BlogSingleComment.css';

const BlogSingleComment = ({ comment, blogId, fetchBlog }) => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const [openReply, setOpenReply] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();

	const [formState, inputHandler] = useForm(
		{
			comment: {
				value: '',
				isValid: false,
			},
			creator: {
				value: auth.userId ? auth.userId : null,
				isValid: auth.userId ? true : false,
			},
			blog: {
				value: blogId ? blogId : null,
				isValid: blogId ? true : false,
			},
			responseTo: {
				value: comment.id ? comment.id : '',
				isValid: comment.id ? true : false,
			},
		},
		false
	);

	const openReplyHandler = () => {
		setOpenReply((prevState) => !prevState);
	};

	const commentSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/blogs/${blogId}/comment`,
				'POST',
				JSON.stringify({
					comment: formState.inputs.comment.value,
					responseTo: comment.id,
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				}
			);
			fetchBlog();
		} catch (err) {}
	};

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
				`${process.env.REACT_APP_BACKEND_URL}/blogs/${blogId}/comment/${comment.id}`,
				'DELETE',
				null,
				{ Authorization: `Bearer ` + auth.token }
			);
			navigate("/");
		} catch (err) {}
	};

	return (
		<div className='singleComment'>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div>
					<Loadingspinner asOverlay />
				</div>
			)}
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
					Do you want to proceed and delete this comment? <br /> Please note
					that it can't be undone thereafter. <br /> After deleting comments,
					you will go back toppage.
				</p>
			</Modal>

			<div className='singleComment__imgContainer'>
				<img
					src={comment.creator.avatar}
					alt={comment.creator.name}
				/>
			</div>
			<div className='singleComment__infoContainer'>
				<h2>{comment.creator.name}</h2>
				<h5>
					{new Date(comment.creator.createdAt).toLocaleDateString()}
					{auth.userId === comment.creator.id && (
						<i
							className='fa-solid fa-trash'
							onClick={showDeleteWarningHandelr}
						></i>
					)}
				</h5>
				<p>{comment.comment}</p>
				{!comment.responseTo && (
					<Button onClick={openReplyHandler}>Reply</Button>
				)}

				{openReply && (
					<div className='singleComment__reply'>
						<form onSubmit={commentSubmitHandler}>
							<Input
								id='comment'
								placeholder={
									!auth.userId
										? 'You need login'
										: 'LEAVE YOUR COMMENTS'
								}
								validators={[
									VALIDATOR_REQUIRE(),
									VALIDATOR_MAXLENGTH(500),
								]}
								element='input'
								errorText='Please enter valid comments'
								onInput={inputHandler}
								disabled={!auth.userId && 'disabled'}
							/>
							<Button
								type='submit'
								info
								disabled={!auth.userId && 'disabled'}
							>
								Comment
							</Button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};
export default memo(BlogSingleComment);
