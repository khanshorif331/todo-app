// import logo from './logo.svg'
import './App.css'
import Navbar from './shared/Navbar'
import { Routes, Route } from 'react-router-dom'
import ToDo from './pages/ToDo/ToDo'
import Completed from './pages/Completed/Completed'
import Calender from './pages/Calender/Calender'
import Login from './pages/Login/Login'
import Signup from './pages/Login/Signup'
import { ToastContainer } from 'react-toastify'
import ResetPassword from './pages/Login/ResetPassword'
import 'react-toastify/dist/ReactToastify.css'
import RequireAuth from './pages/Login/RequireAuth'
import Footer from './shared/Footer'

function App() {
	return (
		<div className='App'>
			<Navbar></Navbar>
			<Routes>
				<Route
					path='/'
					element={
						<RequireAuth>
							<ToDo></ToDo>
						</RequireAuth>
					}
				></Route>
				<Route
					path='/ToDo'
					element={
						<RequireAuth>
							<ToDo></ToDo>
						</RequireAuth>
					}
				></Route>
				<Route
					path='/completed'
					element={
						<RequireAuth>
							<Completed></Completed>
						</RequireAuth>
					}
				></Route>
				<Route path='/calender' element={<Calender></Calender>}></Route>
				<Route path='login' element={<Login></Login>}></Route>
				<Route path='signup' element={<Signup></Signup>}></Route>
				<Route
					path='resetPass'
					element={<ResetPassword></ResetPassword>}
				></Route>
			</Routes>
			<Footer></Footer>
			<ToastContainer></ToastContainer>
		</div>
	)
}

export default App
