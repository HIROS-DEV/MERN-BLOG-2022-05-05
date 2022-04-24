import FooterTitle from './FooterTitle';
import FooterExplore from './FooterExplore';
import FooterRecentPosts from './FooterRecentPosts';
import FooterInfo from './FooterInfo';
import FooterCopyright from './FooterCopyright';
import Newsletter from './Newsletter';
import './MainFooter.css';

const MainFooter = () => {
	return (
		<>
			<Newsletter />
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
