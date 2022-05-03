import { memo } from 'react';
import Avatar from '../../shared/components/UIElements/Avatar';
import './BlogDetailAuthor.css';

const BlogDetailAuthor = ({ avatar, creator, creatorInfo }) => {
	return (
		<div className='blogDetail__author'>
			<div className='blogDetail__authorContainer'>
				<Avatar
					image={`${avatar}`}
					alt={creator}
					width='100px'
					height='100px'
					className='blogDetail'
				/>
				<div className='blogDetail__authorInfoContainer'>
					<h1>{creator}</h1>
					<p>{creatorInfo}</p>
				</div>
			</div>
		</div>
	);
};
export default memo(BlogDetailAuthor);
