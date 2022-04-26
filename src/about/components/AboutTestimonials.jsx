import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { RiDoubleQuotesL } from 'react-icons/ri';

import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './AboutTestimonials.css';

const DUMMY_TESTIMONIALS = [
	{
		id: v4(),
		avatar: faker.image.avatar(),
		user: faker.name.firstName(),
		posiiton: faker.name.jobType(),
		testimonial: faker.lorem.sentences(),
	},
	{
		id: v4(),
		avatar: faker.image.avatar(),
		user: faker.name.firstName(),
		posiiton: faker.name.jobType(),
		testimonial: faker.lorem.sentences(),
	},
	{
		id: v4(),
		avatar: faker.image.avatar(),
		user: faker.name.firstName(),
		posiiton: faker.name.jobType(),
		testimonial: faker.lorem.sentences(),
	},
	{
		id: v4(),
		avatar: faker.image.avatar(),
		user: faker.name.firstName(),
		posiiton: faker.name.jobType(),
		testimonial: faker.lorem.sentences(),
	},
	{
		id: v4(),
		avatar: faker.image.avatar(),
		user: faker.name.firstName(),
		posiiton: faker.name.jobType(),
		testimonial: faker.lorem.sentences(),
	},
	{
		id: v4(),
		avatar: faker.image.avatar(),
		user: faker.name.firstName(),
		posiiton: faker.name.jobType(),
		testimonial: faker.lorem.sentences(),
	},
];

const AboutTestimonials = () => {
	return (
		<div className='about__testimonials'>
			<p>TESTIMONIAL</p>
			<h1>Happy Readers</h1>
			<div className='about__testimonials-Container'>
				<Swiper
					slidesPerView={1}
					spaceBetween={10}
					pagination={{
						clickable: true,
					}}
					autoplay={{
						delay: 4500,
						disableOnInteraction: false,
					}}
					breakpoints={{
						768: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
					}}
					modules={[Pagination, Autoplay, Navigation]}
					className='mySwiper'
				>
					{DUMMY_TESTIMONIALS.map((user) => (
						<SwiperSlide key={user.id}>
							<div className='about__testimonials--swiper'>
								<div className='about__testimonials--swiperInner'>
									<div className='about__testimonials--imgContainer'>
										<img src={user.avatar} alt={user.user} />
										<RiDoubleQuotesL className='about__testimonials--icon'/>
									</div>
									<div>
										<h2>{user.user}</h2>
										<h5>{user.posiiton}</h5>
									</div>
								</div>
								<p>{user.testimonial}</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};
export default AboutTestimonials;
