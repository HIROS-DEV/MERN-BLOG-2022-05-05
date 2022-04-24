import Input from '../FormElements/Input';
import Button from '../FormElements/Button';

import './Newsletter.css';

const Newsletter = () => {
	return (
		<div className='newsletter'>
			<h1>Newsletter - Stay tune and get the latest update</h1>
			<p>Far far away, behind the word mountains</p>
			<div className='newsletter__inputContainer'>
				<Input
					onInput={() => {}}
					element='input'
					placeholder='Enter email address'
					className={'newsletter__input'}
				/>
				<Button>SUBSCRIBE</Button>
			</div>
		</div>
	);
};
export default Newsletter;
