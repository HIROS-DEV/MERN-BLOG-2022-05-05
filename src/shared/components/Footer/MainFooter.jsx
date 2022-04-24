import FooterTitle from './FooterTitle';
import FooterExplore from './FooterExplore';
import FooterRecentPosts from './FooterRecentPosts';
import FooterInfo from './FooterInfo';
import './MainFooter.css';
import FooterCopyright from './FooterCopyright';

const MainFooter = () => {
	return (
		<>
			<footer className='footer'>
				<FooterTitle />
				<FooterExplore />
				<FooterRecentPosts />
				<FooterInfo />
			</footer>
			<FooterCopyright />
		</>
	);
};
export default MainFooter;
