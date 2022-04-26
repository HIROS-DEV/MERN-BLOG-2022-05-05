import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';

const DUMMY_POSTS = [
	{
		id: v4(),
		createdAt: new Date().toLocaleDateString(),
		creator: faker.name.firstName(),
		title: faker.lorem.paragraph(),
		image: faker.image.image(),
	},
	{
		id: v4(),
		createdAt: new Date().toLocaleDateString(),
		creator: faker.name.firstName(),
		title: faker.lorem.paragraph(),
		image: faker.image.image(),
	},
	{
		id: v4(),
		createdAt: new Date().toLocaleDateString(),
		creator: faker.name.firstName(),
		title: faker.lorem.paragraph(),
		image: faker.image.image(),
	},
];

const FooterRecentPosts = () => {
	return (
		<div className='footer_recentPosts'>
			<h2 className='footer__title'>RECENT POSTS</h2>
			<ul className='footer__recentPostsUl'>
				{DUMMY_POSTS.map((post) => (
					<li key={post.id} className='footer__recentPostsLi'>
						<Link to={`/blog/${post.id}`}>
							<div>
								<img src={post.image} alt={post.title} />
							</div>
							<div className='footer__recentPostsLi--rightWrapper'>
								<div className='footer__recentPostLi-creatorInfo'>
									<i className='fa-solid fa-calendar-days'></i>
									<p>{post.createdAt}</p>
									<span className='footer__recentPostLi-creatorAvatar'>
										<img
											src={faker.image.avatar()}
											alt={post.creator}
										/>
									</span>
									<p>{post.creator}</p>
								</div>
								<p className='footer__recentPostsLi--title'>
									{post.title}
								</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
export default FooterRecentPosts;
