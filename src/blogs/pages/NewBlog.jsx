import { useEffect } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import './NewBlog.css';

const NewBlog = () => {
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
		},
		false
	);

	//TODO: Create blog submit handler function!!!!!
	const blogSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<form className='blog-form' onSubmit={blogSubmitHandler}>
			<div className='blog-form__container'>
				<Input
					id='title'
					type='text'
					label='BLOG TITLE'
					element='input'
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
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
				<Button type='submit' disabled={!formState.isValid}>
					CREATE BLOG
				</Button>
			</div>
		</form>
	);
};
export default NewBlog;
