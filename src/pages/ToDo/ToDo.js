import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'

const ToDo = () => {
	const [user] = useAuthState(auth)

	const handleSubmit = e => {
		e.preventDefault()
		const todo = e.target.todo.value
		const item = {
			todo: todo,
			user: user?.email,
			status: 'pending',
		}
		console.log(item)
		fetch('http://localhost:5000/todo', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(item),
		})
			.then(res => res.json())
			.then(data => console.log(data))
	}
	// console.log(todo, 'after', user)
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='todo'
					placeholder='Type here'
					class='input input-bordered input-primary w-full max-w-xs'
				/>
				<input className='btn' type='submit' value='Add Task' />
			</form>
		</div>
	)
}

export default ToDo
