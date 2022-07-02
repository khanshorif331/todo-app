import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const TodoItem = ({ item, refetch }) => {
	const MySwal = withReactContent(Swal)
	const [complete, setComplete] = useState(false)

	// handle completed button
	const handleComplete = (e, _id) => {
		let isChecked = e.target.checked
		setComplete(isChecked)
		fetch(`http://localhost:5000/todo/${_id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => {
				if (data.modifiedCount > 0) {
					fetch(`http://localhost:5000/completed/${_id}`, {
						method: 'POST',
						headers: {
							'content-type': 'application/json',
						},
						body: JSON.stringify(item),
					})
						.then(res => res.json())
						.then(data => refetch())
				}
			})
	}

	// handling delete
	const handleDelete = (e, _id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, Delete User!',
		}).then(result => {
			if (result.isConfirmed) {
				const url = `https://todo-app-server-public.herokuapp.com/todo/${_id}`
				fetch(url, {
					method: 'DELETE',
				})
					.then(res => res.json())
					.then(data => {
						if (data.deletedCount > 0) {
							refetch()
						}
					})
				Swal.fire(
					'Task Deleted!',
					'Task has been Deleted Successfully.',
					'success'
				)
			}
		})
	}

	return (
		<div className='mx-auto w-full md:w-1/2 my-6 h-16 rounded-lg shadow-md px-4 hover:outline'>
			{/* <p>Name:{item.todo}</p> */}
			<div className='form-control'>
				<label className='label cursor-pointer'>
					{/* complete */}
					{item.status === 'completed' ? (
						<strike className='label-text text-xl'>
							{item.todo}
							<div className='badge badge-primary'>completed</div>{' '}
						</strike>
					) : (
						<span className='label-text text-xl'>{item.todo}</span>
					)}
					<button
						onClick={e => handleDelete(e, item._id)}
						className='btn btn-xs'
					>
						Delete
					</button>
					<button className='btn btn-xs'>Edit</button>
					<input
						type='checkbox'
						name='complete'
						disabled={item.status === 'completed'}
						onChange={e => handleComplete(e, item._id)}
						className='checkbox checkbox-primary'
					/>
				</label>
			</div>
		</div>
	)
}

export default TodoItem
