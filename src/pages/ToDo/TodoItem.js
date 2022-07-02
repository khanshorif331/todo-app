import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const TodoItem = ({ item, refetch }) => {
	const MySwal = withReactContent(Swal)
	const [complete, setComplete] = useState(false)
	// console.log(item._id)
	const handleComplete = (e, _id) => {
		let isChecked = e.target.checked
		setComplete(isChecked)
		console.log(_id, isChecked)
	}

	// handling delete
	const handleDelete = (e, _id) => {
		// console.log(_id)
		// fetch(`http://localhost:5000/todo/${_id}`, {
		// 	method: 'DELETE',
		// })
		// 	.then(res => res.json())
		// 	.then(data => console.log(data))

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
				const url = `http://localhost:5000/todo/${_id}`
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
					'User Deleted!',
					'User has been Deleted Successfully.',
					'success'
				)
			}
		})
	}

	return (
		<div className='mx-auto w-full md:w-1/2 my-6 h-16 rounded-lg shadow-md px-4 hover:outline'>
			{/* <p>Name:{item.todo}</p> */}
			<div class='form-control'>
				<label class='label cursor-pointer'>
					{complete ? (
						<strike class='label-text text-xl'>
							{item.todo}
							<div class='badge badge-primary'>completed</div>{' '}
						</strike>
					) : (
						<span class='label-text text-xl'>{item.todo}</span>
					)}
					<button
						onClick={e => handleDelete(e, item._id)}
						class='btn btn-xs'
					>
						Delete
					</button>
					<button class='btn btn-xs'>Edit</button>
					<input
						type='checkbox'
						name='complete'
						onChange={e => handleComplete(e, item._id)}
						class='checkbox checkbox-primary'
					/>
				</label>
			</div>
		</div>
	)
}

export default TodoItem
