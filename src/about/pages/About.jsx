import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import BlogsHeader from '../../shared/components/Header/BlogsHeader';
import Info from '../components/AboutInfo';
import Testimonial from '../components/AboutTestimonials';
import './About.css';

const About = () => {

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		AOS.init({
			duration: 1500
		});
		AOS.refresh();
	}, []);
	
	return (
		<div className='about'>
			<BlogsHeader />
			<Info aos='fade-up'/>
			<Testimonial aos='fade-left'/>
		</div>
	);
};
export default About;
