import { useState, useContext, useEffect } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import {
	VALIDATOR_EMAIL,
	VALIDATOR_MAXLENGTH,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
	const auth = useContext(AuthContext);

	const [isLoginMode, setIsLoginMode] = useState(true);

	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();

	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const switchModeHandler = (e) => {
		if (!isLoginMode) {
			setFormData(
				{ ...formState.inputs, name: undefined, avatar: undefined },
				formState.inputs.email.isValid &&
					formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
					avatar: {
						value: null,
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};

	const authSubmitHandler = async (e) => {
		e.preventDefault();

		if (isLoginMode) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
					'POST',
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
					{
						'Content-Type': 'application/json',
					}
				);

				auth.login(responseData.userId, responseData.token);
			} catch (err) {}
		} else {
			try {
				const formData = new FormData();
				formData.append('name', formState.inputs.name.value);
				formData.append('email', formState.inputs.email.value);
				formData.append('password', formState.inputs.password.value);
				formData.append('avatar', formState.inputs.avatar.value);
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
					'POST',
					formData
				);
				auth.login(responseData.userId, responseData.token);
			} catch (err) {}
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<div className='auth-form'>
				{isLoading && <LoadingSpinner asOverlay />}
				<div className='auth-form__container'>
					<h2>{isLoginMode ? 'Login' : 'Signup'} Required</h2>
					<hr />
					<form onSubmit={authSubmitHandler}>
						{!isLoginMode && (
							<Input
								element='input'
								id='name'
								type='text'
								label='Your Name'
								validators={[
									VALIDATOR_REQUIRE(),
									VALIDATOR_MAXLENGTH(30),
								]}
								errorText='Please enter your name (Less than 30 characters)'
								onInput={inputHandler}
							/>
						)}
						{!isLoginMode && (
							<ImageUpload
								id='avatar'
								onInput={inputHandler}
								errorText='Please provide an image.'
							/>
						)}
						<Input
							element='input'
							id='email'
							type='email'
							label='E-Mail'
							validators={[VALIDATOR_REQUIRE, VALIDATOR_EMAIL()]}
							errorText='Please enter a valid email address.'
							onInput={inputHandler}
						/>
						<Input
							element='input'
							id='password'
							type='password'
							label='Password'
							validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(6)]}
							errorText='Please enter a valid password (At least 6 characters.)'
							onInput={inputHandler}
						/>
						<Button type='submit' disabled={!formState.isValid}>
							{isLoginMode ? 'LOGIN' : 'SIGNUP'}
						</Button>
					</form>
					<Button info onClick={switchModeHandler}>
						SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
					</Button>
				</div>
			</div>
		</>
	);
};
export default Auth;
