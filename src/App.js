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
import './App.css';

const App = () => {

	return (
		<div className='app'>
			<Router>
				<MainHeader />
				<main className='app__main'>
					<Routes>
						<Route path='/' element={<Blogs />} />
						<Route path='/blog/:blogId' element={<BlogDetail />} />
						<Route path='/blog/edit/:blogId' element={<EditBlog />} />
						<Route path='/new' element={<NewBlog />} />
						<Route path='/auth' element={<Auth />} />
						<Route path='/about' element={<About />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='*' element={<Navigate to='/' replace />} />
					</Routes>
				</main>
			</Router>
		</div>
	);
};
export default App;