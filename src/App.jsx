import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoWrapper from './TodoWrapper';

function App() {
	return (
		<div className='app'>
			<ToastContainer autoClose={2000} />

			<TodoWrapper />
		</div>
	);
}

export default App;
