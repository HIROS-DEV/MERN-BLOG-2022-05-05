import { v4 } from 'uuid';

import AboutInfoSkills from './AboutInfoSkills';
import './AboutInfo.css';

const INFO_SKILLS = [
	{
		id: v4(),
		title: 'React & Redux',
		className: 'react',
		text: `Usually, I use React & Redux in Frontend jobs. But also, I can use view engine(especially ejs) and Next.js`,
	},
	{
		id: v4(),
		title: 'Node.js & Express',
		className: 'node',
		text: `Usually, I use REST architectural style in Backend jobs. But also, I can use GraphQL`,
	},
	{
		id: v4(),
		title: 'MongoDB & Mongoose',
		className: 'mongo',
		text: `I always use MongoDB & Mongoose in Backend jobs. Also, I am going to learn SQL in the near future.`,
	},
];

const AboutInfo = ({ aos }) => {
	return (
		<div className='about__info' data-aos={aos}>
			<div>
				<img
					src='https://images.unsplash.com/photo-1535930749574-1399327ce78f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80'
					alt='info img'
				/>
			</div>
			<div className='about__info--profile'>
				<p>I'M HIRO</p>
				<h1>
					I AM A WEB DEVELOPER & <br /> I LOVE MERN FULL STACK
				</h1>

				{INFO_SKILLS.map((info) => (
					<AboutInfoSkills
						key={info.id}
						className={info.className}
						title={info.title}
						text={info.text}
					/>
				))}
			</div>
		</div>
	);
};
export default AboutInfo;
