import React, { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import MainHeader from './shared/components/Header/MainHeader';
import MainFooter from './shared/components/Footer/MainFooter';
import Loadingspinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import './App.css';

const Blogs = React.lazy(() => import('./blogs/pages/Blogs'));
const BlogDetail = React.lazy(() =>
	import('./blogs/pages/BlogDetail')
);
const NewBlog = React.lazy(() => import('./blogs/pages/NewBlog'));
const EditBlog = React.lazy(() => import('./blogs/pages/EditBlog'));
const Auth = React.lazy(() => import('./auth/pages/Auth'));
const About = React.lazy(() => import('./about/pages/About'));
const Contact = React.lazy(() => import('./contact/pages/Contact'));

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
							<Suspense
								fallback={
									<div>
										<Loadingspinner asOverlay />
									</div>
								}
							>
								<Routes>{routes}</Routes>
							</Suspense>
						</main>
						<MainFooter />
					</Router>
				</div>
			</ParallaxProvider>
		</AuthContext.Provider>
	);
};
export default App;
