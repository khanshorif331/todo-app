// import logo from './logo.svg'
import './App.css'
import Navbar from './shared/Navbar'
import { Routes, Route } from 'react-router-dom'
import ToDo from './pages/ToDo/ToDo'
import Completed from './pages/Completed/Completed'
import Calender from './pages/Calender/Calender'

function App() {
	return (
		<div className='App'>
			<Navbar></Navbar>
			<Routes>
				<Route path='/' element={<ToDo></ToDo>}></Route>
				<Route path='/ToDo' element={<ToDo></ToDo>}></Route>
				<Route path='/completed' element={<Completed></Completed>}></Route>
				<Route path='/calender' element={<Calender></Calender>}></Route>
			</Routes>
		</div>
	)
}

export default App
