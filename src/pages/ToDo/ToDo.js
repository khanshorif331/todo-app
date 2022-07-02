import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import auth from '../../firebase.init'
import Loading from '../../shared/Loading'
import TodoItem from '../../pages/ToDo/TodoItem'

const ToDo = () => {
	const [user] = useAuthState(auth)
	const email = user?.email
	const url = `https://todo-app-server-public.herokuapp.com/todos/${email}`

	const { isLoading, data, refetch } = useQuery('todoData', () =>
		fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		}).then(res => res.json())
	)
	console.log(data)

	// if (isLoading) {
	// 	return <Loading></Loading>
	// }

	const handleSubmit = e => {
		e.preventDefault()
		const todo = e.target.todo.value
		if (!todo) {
			return toast.error('Please enter some value!!!')
		}
		const item = {
			todo: todo,
			user: user?.email,
			status: 'pending',
		}

		fetch('https://todo-app-server-public.herokuapp.com/todo', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(item),
		})
			.then(res => res.json())
			.then(data => {
				if (data.acknowledged === true) {
					refetch()
					toast('Task added successfully')
				}
			})
		e.target.reset()
	}
	return (
		<div className='w-full'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='todo'
					placeholder='Type here'
					className='input input-bordered input-primary w-full max-w-xs'
				/>
				<input className='btn' type='submit' value='Add Task' />
			</form>
			{isLoading && <Loading></Loading>}
			<div>
				{data &&
					// <p>{data.length}</p>
					data.map(item => (
						<TodoItem
							key={item._id}
							item={item}
							refetch={refetch}
						></TodoItem>
						// <ul>
						// 	<li>{data.todo}</li>
						// </ul>
					))}
			</div>
		</div>
	)
}

export default ToDo
