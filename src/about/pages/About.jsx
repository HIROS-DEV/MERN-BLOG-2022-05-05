import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import BlogsHeader from '../../shared/components/Header/BlogsHeader';
import Info from '../components/AboutInfo';
import Testimonial from '../components/AboutTestimonials';
import './About.css';

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className='about'>
			<BlogsHeader />
			<Info />
			<Testimonial />
		</div>
	);
};
export default About;
