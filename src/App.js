import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import Blogs from './blogs/pages/Blogs';
import BlogDetail from './blogs/pages/BlogDetail';
import NewBlog from './blogs/pages/NewBlog';
import EditBlog from './blogs/pages/EditBlog';
import Auth from './auth/pages/Auth';
import About from './about/pages/About';
import Contact from './contact/pages/Contact';
import MainHeader from './shared/components/Header/MainHeader';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import MainFooter from './shared/components/Footer/MainFooter';

import './App.css';

const App = () => {
	const { token, login, logout, userId } = useAuth();

	let routes;

	if (token) {
		routes = (
			<>
				<Route path='/' element={<Blogs />} />
				<Route path='/blog/:blogId' element={<BlogDetail />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/blog/edit/:blogId' element={<EditBlog />} />
				<Route path='/new' element={<NewBlog />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</>
		);
	} else {
		routes = (
			<>
				<Route path='/' element={<Blogs />} />
				<Route path='/blog/:blogId' element={<BlogDetail />} />
				<Route path='/about' element={<About />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/*' element={<Navigate to='/auth' replace />} />
			</>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			<ParallaxProvider>
				<div className='app'>
					<Router>
						<MainHeader />
						<main className='app__main'>
							<Routes>{routes}</Routes>
						</main>
						<MainFooter />
					</Router>
				</div>
			</ParallaxProvider>
		</AuthContext.Provider>
	);
};
export default App;
