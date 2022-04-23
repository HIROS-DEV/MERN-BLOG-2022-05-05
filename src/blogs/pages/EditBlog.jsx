import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './EditBlog.css';
import { AuthContext } from '../../shared/context/auth-context';

const EditBlog = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const { blogId } = useParams();

	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();
	const [loadedBlog, setLoadedBlog] = useState();

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: '',
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	useEffect(() => {
		const fetchBlog = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/blogs/${blogId}`
				);
				setLoadedBlog(responseData.blog);
				setFormData(
					{
						title: {
							value: responseData.blog.title,
							isValid: true,
						},
						description: {
							value: responseData.blog.description,
							isValid: true,
						},
					},
					true
				);
			} catch (err) {}
		};
		fetchBlog();
	}, [sendRequest, blogId, setFormData]);

	const blogUpdateSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			await sendRequest(
				`http://localhost:5000/api/blogs/${blogId}`,
				'PATCH',
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				}
			);
			navigate(`/blog/${blogId}`);
		} catch (err) {}
	};

	if (isLoading) {
		return (
			<div className='center'>
				<LoadingSpinner />
			</div>
		);
	}

	if (!loadedBlog && !error) {
		return (
			<div className='center'>
				<h2>404 | NOT FOUND BLOG.</h2>
			</div>
		);
	}

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading && loadedBlog && (
				<form
					className='blog-form'
					onSubmit={blogUpdateSubmitHandler}
				>
					<div className='blog-form__container'>
						<Input
							id='title'
							type='text'
							label='UPDATE BLOG TITLE'
							element='input'
							validators={[
								VALIDATOR_REQUIRE(),
								VALIDATOR_MAXLENGTH(50),
							]}
							errorText='Please enter a valid title.(Title must be within 50 characters)'
							onInput={inputHandler}
							initialValue={loadedBlog.title}
							initialValid={true}
						/>
						<Input
							id='description'
							label='UPDATE BLOG DESCRIPTION'
							validators={[
								VALIDATOR_REQUIRE(),
								VALIDATOR_MAXLENGTH(300000),
							]}
							errorText='Please enter a valid description.(Description must be within 300,000 characters)'
							onInput={inputHandler}
							initialValue={loadedBlog.description}
							initialValid={true}
						/>
						<Button type='submit' disabled={!formState.isValid}>
							UPDATE BLOG
						</Button>
					</div>
				</form>
			)}
		</>
	);
};
export default EditBlog;
