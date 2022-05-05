import { useState } from 'react';

import Input from '../FormElements/Input';
import Button from '../FormElements/Button';
import ErrorModal from '../UIElements/ErrorModal';
import Loadingspinner from '../UIElements/LoadingSpinner';

import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_REQUIRE,
} from '../../utils/validators';
import './Newsletter.css';

const Newsletter = () => {
	const [successMessage, setSuccessMessage] = useState('');

	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();

	const [formState, inputHandler] = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const newsletterSubscribeHandler = async (e) => {
		e.preventDefault();
		try {
			const data = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/newsletter`,
				'POST',
				JSON.stringify({
					email: formState.inputs.newsletter.value,
				}),
				{
					'Content-Type': 'application/json',
				}
			);
			setSuccessMessage(data.message);
			setTimeout(() => {
				setSuccessMessage("")
			}, 2000)
		} catch (err) { }
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <Loadingspinner asOverlay />}
			<div className='newsletter'>
				<h1>Newsletter - Stay tune and get the latest update</h1>
				<p>
					If you enter email address, you receive "Please Confirm
					Subscription" email from me.
				</p>
				<p>But, don't worry. I've never send you real newsletter.</p>
				<div className='newsletter__inputContainer'>
					<form onSubmit={newsletterSubscribeHandler}>
						<Input
							element='input'
							id='newsletter'
							type='email'
							placeholder='Enter email address'
							validators={[VALIDATOR_REQUIRE, VALIDATOR_EMAIL()]}
							errorText='Please enter a valid email address.'
							onInput={inputHandler}
							className={'newsletter__input'}
						/>
						<Button>SUBSCRIBE</Button>
					</form>
				</div>
				{successMessage && (
					<p className='newsletter__success'>{successMessage}</p>
				)}
			</div>
		</>
	);
};
export default Newsletter;
