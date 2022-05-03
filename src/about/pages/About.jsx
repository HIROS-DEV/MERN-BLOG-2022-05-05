import { useEffect } from 'react';
import AOS from 'aos';

import BlogsHeader from '../../shared/components/Header/BlogsHeader';
import Info from '../components/AboutInfo';
import Testimonial from '../components/AboutTestimonials';
import 'aos/dist/aos.css';
import './About.css';

const About = () => {
	useEffect(() => {
		AOS.init({
			duration: 1500,
		});
		AOS.refresh();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className='about'>
			<BlogsHeader />
			<Info aos='fade-up' />
			<Testimonial aos='fade-left' />
		</div>
	);
};
export default About;
