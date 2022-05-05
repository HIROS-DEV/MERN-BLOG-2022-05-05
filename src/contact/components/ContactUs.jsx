import { useRef, useEffect, useState, memo } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Loadingspinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MAXLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';

import 'mapbox-gl/dist/mapbox-gl.css';
import './ContactUs.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const ContactUs = ({ aos }) => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const [lng, setLng] = useState(-70.9);
	// eslint-disable-next-line no-unused-vars
	const [lat, setLat] = useState(42.35);
	// eslint-disable-next-line no-unused-vars
	const [zoom, setZoom] = useState(9);

	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();

	const [sendSuccessMessage, setSendSuccessMessage] = useState('');
	const [formState, inputHandler] = useForm(
		{
			name: {
				value: '',
				isValid: false,
			},
			email: {
				value: '',
				isValid: false,
			},
			subject: {
				value: '',
				isValid: false,
			},
			message: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const contacfFormSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			const data = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/contact`,
				'POST',
				JSON.stringify({
					name: formState.inputs.name.value,
					email: formState.inputs.email.value,
					subject: formState.inputs.subject.value,
					message: formState.inputs.message.value,
				}),
				{
					'Content-Type': 'application/json',
				}
			);
			setSendSuccessMessage(data.message);
		} catch (err) {}
	};

	useEffect(() => {
		if (map.current) return;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom,
		});
	});

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <Loadingspinner asOverlay />}
			<div className='contactUs' data-aos={aos}>
				<div className='contactUs__innerDiv'>
					<h1>Cotact us</h1>
					<p>We're open for any suggestion or just to have a chat</p>
					<div className='contactUs__infos'>
						<div className='contactUs__info'>
							<h2>ADDRESS:</h2>
							<address>
								15-1, Nihonbashi 1-chome, Chuo-ku, Tokyo
							</address>
						</div>
						<div className='contactUs__info'>
							<h2>EMAIL:</h2>
							<p>hirosdev@gmail.com</p>
						</div>
						<div className='contactUs__info'>
							<h2>PHONE:</h2>
							<p>+8129-532-5510</p>
						</div>
					</div>
					<form onSubmit={contacfFormSubmitHandler}>
						<Input
							id='name'
							placeholder='Name'
							type='text'
							element='input'
							validators={[
								VALIDATOR_REQUIRE(),
								VALIDATOR_MAXLENGTH(50),
							]}
							errorText='Please enter a valid title.(Title must be within 50 characters)'
							onInput={inputHandler}
						/>
						<Input
							id='email'
							placeholder='Email'
							type='text'
							element='input'
							validators={[
								VALIDATOR_REQUIRE(),
								VALIDATOR_MAXLENGTH(200),
								VALIDATOR_EMAIL(),
							]}
							errorText='Please enter a valid email.(Email must be within 200 characters)'
							onInput={inputHandler}
						/>
						<Input
							id='subject'
							placeholder='Subject'
							type='text'
							element='input'
							validators={[
								VALIDATOR_REQUIRE(),
								VALIDATOR_MAXLENGTH(50),
							]}
							errorText='Please enter a subject.(Subject must be within 50 characters)'
							onInput={inputHandler}
						/>
						<Input
							placeholder='Create a message here'
							element='textarea'
							rows={3}
							id='message'
							validators={[
								VALIDATOR_REQUIRE(),
								VALIDATOR_MAXLENGTH(3000),
							]}
							errorText='Please enter your message.(Message must be within 3000 characters)'
							onInput={inputHandler}
						/>
						<Button>SEND MESSAGE</Button>
					</form>
					{sendSuccessMessage && (
						<p className='contactUs__successMessage'>
							{sendSuccessMessage}
						</p>
					)}
				</div>
				<div ref={mapContainer} className='map-container'></div>
			</div>
		</>
	);
};
export default memo(ContactUs);
