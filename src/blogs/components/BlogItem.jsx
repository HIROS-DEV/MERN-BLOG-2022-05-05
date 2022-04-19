import { Link } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import './BlogItem.css';

const BlogItem = (props) => {
	return (
		<li
			className={
				props.index % 2 === 0 ? `blogItem__li` : `blogItem__li reverse`
			}
		>
			<div className='blogItem__imgContainer'>
				<Link to={`/blog/${props.id}`}>
					<img src={props.image} alt={props.title} />
				</Link>
			</div>
			<div className='blogItem__summaryContainer'>
				<div className='blogItem__itemContainer'>
					<div className='blogItem__itemWrapper'>
						<i className='fa-solid fa-user'></i>
						<p>{props.creator}</p>
					</div>
					<div className='blogItem__itemWrapper'>
						<i className='fa-solid fa-calendar-days'></i>
						<p>{props.createdAt}</p>
					</div>
					<div className='blogItem__itemWrapper'>
						<Link to={`/blog/${props.id}`}>
							<i className='fa-solid fa-comment'></i>
							{/* TODO: show comments length from props*/}
							<p>3 comments</p>
						</Link>
					</div>
				</div>
				<Link to={`/blog/${props.id}`}>
					<h1>{props.title}</h1>
				</Link>
				<p>{props.description}</p>
				<Button to={`/blog/${props.id}`}>
					SEE MORE<i className='fa-solid fa-arrow-right-long'></i>
				</Button>
			</div>
		</li>
	);
};
export default BlogItem;
