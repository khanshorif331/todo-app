import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import Loading from '../../shared/Loading'

const Completed = () => {
	const [user] = useAuthState(auth)
	const [myTodo, setMyTodo] = useState([])
	const [loading, setLoading] = useState(true)
	// setLoading(true)
	useEffect(() => {
		fetch(
			`https://todo-app-server-public.herokuapp.com/myTodo/${user?.email}`
		)
			.then(res => res.json())
			.then(data => setMyTodo(data))
		setLoading(false)
	}, [user])

	// if (loading) {
	// 	return <p>Hello loadign</p>
	// }
	return (
		<div className='w-full'>
			<h1 className='text-center font-bold text-2xl'>
				Total Completed Task : {myTodo.length}
			</h1>
			{loading && <button class='btn loading'>loading</button>}
			<div className='w-full'>
				{myTodo.map(item => (
					<div
						key={item._id}
						className='mx-auto w-full md:w-1/2 my-6 h-16 rounded-lg shadow-md px-4 hover:outline flex items-center justify-between text-xl'
					>
						{item.todo}
						<div class='badge badge-success gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								class='inline-block w-4 h-4 stroke-current'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M6 18L18 6M6 6l12 12'
								></path>
							</svg>
							Completed
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Completed
