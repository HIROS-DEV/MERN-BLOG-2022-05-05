import { FaReact } from 'react-icons/fa';
import { FaNodeJs } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';

const AboutInfoSkills = (props) => {
	return (
		<div className='about__info-skills'>
			<div className='about__info-skillsIcon'>
				{props.className === 'react' && (
					<FaReact className='about__info-skillsIcon-react' />
				)}
				{props.className === 'node' && (
					<FaNodeJs className='about__info-skillsIcon-node' />
				)}
				{props.className === 'mongo' && (
					<SiMongodb className='about__info-skillsIcon-mongo' />
				)}
			</div>
			<div className='about__info-skillsText'>
                <h1>{props.title}</h1>
				<p>
					{props.text}
				</p>
			</div>
		</div>
	);
};
export default AboutInfoSkills;
