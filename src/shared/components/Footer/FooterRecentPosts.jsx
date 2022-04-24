import { Link } from 'react-router-dom';

const DUMMY_POSTS = [
	{
		id: 'p1',
		createdAt: new Date().toLocaleDateString(),
		creator: 'hiro',
		title: 'Creativity and Inspiration',
		image:
			'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
	},
	{
		id: 'p2',
		createdAt: new Date().toLocaleDateString(),
		creator: 'hiro',
		title: 'Creativity and Inspiration2',
		image:
			'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
	},
	{
		id: 'p3',
		createdAt: new Date().toLocaleDateString(),
		creator: 'hiro',
		title: 'Creativity and Inspiration3',
		image:
			'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
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
									<i className='fa-solid fa-user'></i>
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
