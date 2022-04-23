import { useState, useCallback, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import Blogs from './blogs/pages/Blogs';
import BlogDetail from './blogs/pages/BlogDetail';
import NewBlog from './blogs/pages/NewBlog';
import EditBlog from './blogs/pages/EditBlog';
import Auth from './auth/pages/Auth';
import About from './about/pages/About';
import Contact from './contact/pages/Contact';
import MainHeader from './shared/components/Header/MainHeader';
import { AuthContext } from './shared/context/auth-context';
import './App.css';

let logoutTimer;

const App = () => {
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(false);

	const login = useCallback((uid, token, expirationDate) => {
		setToken(token);
		setUserId(uid);
		const tokenExpirationDate =
			expirationDate ||
			new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExpirationDate.toISOString(),
			})
		);
	}, []);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
	}, [login]);

	const logout = useCallback(() => {
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

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
			<div className='app'>
				<Router>
					<MainHeader />
					<main className='app__main'>
						<Routes>{routes}</Routes>
					</main>
				</Router>
			</div>
		</AuthContext.Provider>
	);
};
export default App;
