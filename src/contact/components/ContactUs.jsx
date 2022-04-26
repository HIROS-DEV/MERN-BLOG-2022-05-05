import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import 'mapbox-gl/dist/mapbox-gl.css';
import './ContactUs.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const ContactUs = () => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const [lng, setLng] = useState(-70.9);
	// eslint-disable-next-line no-unused-vars
	const [lat, setLat] = useState(42.35);
	// eslint-disable-next-line no-unused-vars
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom,
		});
	});

	return (
		<div className='contactUs'>
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
						<p>fake@gmail.com</p>
					</div>
					<div className='contactUs__info'>
						<h2>PHONE:</h2>
						<p>+8129-532-5510</p>
					</div>
				</div>
				<form>
					<Input
						element='input'
						placeholder='Name'
						onInput={() => {}}
					/>
					<Input
						element='input'
						placeholder='Email'
						onInput={() => {}}
					/>
					<Input
						placeholder='Subject'
						element='input'
						onInput={() => {}}
					/>
					<Input
						placeholder='Create a message here'
						element='textarea'
						rows={3}
						onInput={() => {}}
					/>
					<Button>SEND MESSAGE</Button>
				</form>
			</div>
			<div ref={mapContainer} className='map-container'></div>
		</div>
	);
};
export default ContactUs;
