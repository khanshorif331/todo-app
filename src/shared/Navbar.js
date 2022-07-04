import { signOut } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { NavLink } from 'react-router-dom'
import auth from '../firebase.init'

const Navbar = () => {
	const [user] = useAuthState(auth)
	const navigation = (
		<>
			<li>
				<NavLink to='/completed'>Completed</NavLink>
			</li>
			<li className='mx-2'>
				<NavLink to='/todo'>ToDo</NavLink>
			</li>

			<li>
				<NavLink to='/calender'>Calender</NavLink>
			</li>
		</>
	)
	const logout = () => {
		signOut(auth)
	}
	return (
		<div>
			<div className='navbar bg-base-200 mb-6'>
				{/* for mobile */}
				<div className='navbar-start'>
					<div className='dropdown'>
						<label tabIndex='0' className='btn btn-ghost lg:hidden'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h8m-8 6h16'
								/>
							</svg>
						</label>
						<ul
							tabIndex='0'
							className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
						>
							{navigation}
						</ul>
					</div>
					<NavLink
						to='/todo'
						className='btn btn-ghost normal-case text-2xl'
					>
						MY TODOS
					</NavLink>
				</div>
				{/* for tab or pc */}
				<div className='navbar-center hidden lg:flex'>
					<ul className='menu menu-horizontal p-0'>{navigation}</ul>
				</div>
				<div className='navbar-end'>
					{user ? (
						<button onClick={logout} className='btn'>
							Logout
						</button>
					) : (
						<NavLink to='/login' className='btn'>
							LOGIN
						</NavLink>
					)}
				</div>
			</div>
		</div>
	)
}

export default Navbar
