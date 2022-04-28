import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import BlogSingleComment from './BlogSingleComment';
import ReplyComment from './ReplyComment';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './BlogComments.css';

const BlogComments = () => {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	const { blogId } = useParams();
	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();

	const [comments, setComments] = useState([]);
	const [formState, inputHandler, setFormData] = useForm(
		{
			comment: {
				value: '',
				isValid: false,
			},
			creator: {
				value: '',
				isValid: false,
			},
			blog: {
				value: '',
				isValid: false,
			},
			responseTo: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	useEffect(() => {
		const fetchBlogDetail = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/blogs/${blogId}/comments`
				);
				setComments(responseData.blog.comments);
			} catch (err) {}
		};
		fetchBlogDetail();
	}, [sendRequest, blogId, comments.length]);

	useEffect(() => {
		setFormData(
			{
				blog: { value: blogId, isValid: true },
				creator: {
					value: auth.userId ? auth.userId : null,
					isValid: auth.userId ? true : false,
				},
				// responseTo: {
				// 	value: auth.userId ? auth.userId : null,
				// 	isValid: auth.userId ? true : false,
				// },
			},
			false
		);
	}, [auth.userId, blogId, setFormData]);

	const commentSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			await sendRequest(
				`http://localhost:5000/api/blogs/${blogId}/comment`,
				'POST',
				JSON.stringify({
					comment: formState.inputs.comment.value,
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				}
			);
			const fetchBlogDetail = async () => {
				try {
					const responseData = await sendRequest(
						`http://localhost:5000/api/blogs/${blogId}/comments`
					);
					setComments(responseData.blog.comments);
				} catch (err) {}
			};
			fetchBlogDetail();
			navigate(`/blog/${blogId}`);
		} catch (err) {}
	};

	return (
		<>
			<div className='comments'>
				<ErrorModal error={error} onClear={clearError} />
				{isLoading && (
					<div>
						<LoadingSpinner asOverlay />
					</div>
				)}
				{!isLoading && comments && (
					<>
						{comments.length > 1 && (
							<h1>{comments.length} Comments</h1>
						)}
						{comments.length === 1 && <h1>1 Comment</h1>}
						{!comments.length && <h1>No Comment Yet</h1>}

						{comments &&
							comments.map(
								(comment, index) =>
									!comment.responseTo && (
										<div key={comment.id}>
											<BlogSingleComment
												key={comment.id}
												comment={comment}
											/>
										</div>
									)
							)}

						<form
							className='comment-form'
							onSubmit={commentSubmitHandler}
						>
							{isLoading && <LoadingSpinner asOverlay />}
							<div className='comment-form__container'>
								<Input
									id='comment'
									label='LEAVE YOUR COMMENTS'
									validators={[
										VALIDATOR_REQUIRE(),
										VALIDATOR_MAXLENGTH(300000),
									]}
									rows='10'
									errorText='Please enter valid comments'
									onInput={inputHandler}
									disabled={!auth.userId && 'disabled'}
								/>
								<Button type='submit' disabled={!formState.isValid}>
									{auth.userId ? 'COMMENTS' : 'NEED LOGIN'}
								</Button>
							</div>
						</form>
					</>
				)}
			</div>
		</>
	);
};
export default BlogComments;
