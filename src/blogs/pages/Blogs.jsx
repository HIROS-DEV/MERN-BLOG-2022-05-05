import BlogsHeader from '../components/BlogsHeader';
import BlogsList from '../components/BlogsList';
import './Blogs.css';

//TODO: When you retrieve api data from the backend, you have to add the comments section
const BLOGS = [
	{
		id: 'id1',
		title: 'Writing A Novel with A Heart',
		image:
			'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
		description:
			'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
		creator: 'Hiro',
		createdAt: new Date().toLocaleDateString(),
	},
	{
		id: 'id2',
		title:
			'Writing A Novel with A Heart.Writing A Novel with A Heart',
		image:
			'https://images.unsplash.com/photo-1575561723050-3a69691d9700?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
		description:
			'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
		creator: 'Ameria',
		createdAt: new Date().toLocaleDateString(),
	},
	{
		id: 'id3',
		title: 'Writing A Novel with A Heart',
		image:
			'https://images.unsplash.com/photo-1650207857434-c07b89c1711b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=733&q=80',
		description:
			'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
		creator: 'Josh',
		createdAt: new Date().toLocaleDateString(),
	},
	{
		id: 'id4',
		title: 'Writing A Novel with A Heart',
		image:
			'https://images.unsplash.com/photo-1611832197549-ff910be125dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
		description:
			'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
		creator: 'Ketty',
		createdAt: new Date().toLocaleDateString(),
	},
];
const Blogs = () => {
	return (
		<div className='blogs'>
			<BlogsHeader />
			<BlogsList items={BLOGS} />
		</div>
	);
};
export default Blogs;
