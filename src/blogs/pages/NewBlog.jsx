import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './NewBlog.css';

const NewBlog = () => {
	const navigate = useNavigate();

	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();

	const [formState, inputHandler] = useForm(
		{
			title: {
				value: '',
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
			image: {
				value: null,
				isValid: false,
			},
		},
		false
	);

	const blogSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('title', formState.inputs.title.value);
			formData.append(
				'description',
				formState.inputs.description.value
			);
			formData.append('creator', auth.userId);
			formData.append('image', formState.inputs.image.value);
			await sendRequest(
				`http://localhost:5000/api/blogs`,
				'POST',
				formData,
				{ Authorization: 'Bearer ' + auth.token }
			);
			navigate('/');
		} catch (err) {}
	};


	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<form className='blog-form' onSubmit={blogSubmitHandler}>
				{isLoading && <LoadingSpinner asOverlay />}
				<div className='blog-form__container'>
					<Input
						id='title'
						type='text'
						label='BLOG TITLE'
						element='input'
						validators={[
							VALIDATOR_REQUIRE(),
							VALIDATOR_MAXLENGTH(50),
						]}
						errorText='Please enter a valid title.(Title must be within 50 characters)'
						onInput={inputHandler}
					/>
					<Input
						id='description'
						label='BLOG DESCRIPTION'
						validators={[
							VALIDATOR_REQUIRE(),
							VALIDATOR_MAXLENGTH(300000),
						]}
						errorText='Please enter a valid description.(Description must be within 300,000 characters)'
						onInput={inputHandler}
					/>
					<ImageUpload
						id='image'
						onInput={inputHandler}
						errorText='Please provide an image.'
					/>
					<Button type='submit' disabled={!formState.isValid} info>
						CREATE BLOG
					</Button>
				</div>
			</form>
		</>
	);
};
export default NewBlog;
