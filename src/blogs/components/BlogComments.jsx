import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

const BlogComments = ({ comments, fetchBlog }) => {
	const auth = useContext(AuthContext);
	const { blogId } = useParams();

	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();

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
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		setFormData(
			{
				blog: { value: blogId, isValid: true },
				creator: {
					value: auth.userId ? auth.userId : null,
					isValid: auth.userId ? true : false,
				},
			},
			false
		);
	}, [auth.userId, blogId, setFormData]);

	const commentSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/blogs/${blogId}/comment`,
				'POST',
				JSON.stringify({
					comment: formState.inputs.comment.value,
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				}
			);
			fetchBlog();
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
					<div>
						{comments.length > 1 ? (
							<h1>{comments.length} Comments</h1>
						) : (
							<h1>{comments.length} Comment</h1>
						)}

						{comments &&
							comments.map(
								(comment) =>
									!comment.responseTo && (
										<div key={comment.id}>
											<BlogSingleComment
												key={comment.id}
												comment={comment}
												blogId={blogId}
												comments={comments}
												fetchBlog={fetchBlog}
											/>
											<ReplyComment
												comment={comment}
												comments={comments}
												parentCommentId={comment.id}
											/>
										</div>
									)
							)}

						<form
							className='comment-form'
							onSubmit={commentSubmitHandler}
						>
							<div className='comment-form__container'>
								<Input
									id='comment'
									label='LEAVE YOUR COMMENTS'
									validators={[
										VALIDATOR_REQUIRE(),
										VALIDATOR_MAXLENGTH(500),
									]}
									rows='10'
									errorText='Please enter valid comments.(within 500 characters)'
									onInput={inputHandler}
									disabled={!auth.userId && 'disabled'}
								/>
								<Button type='submit' disabled={!formState.isValid}>
									{auth.userId ? 'COMMENTS' : 'NEED LOGIN'}
								</Button>
							</div>
						</form>
					</div>
				)}
			</div>
		</>
	);
};
export default BlogComments;
