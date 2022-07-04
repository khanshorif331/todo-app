import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast } from 'react-toastify'
import Loading from '../../shared/Loading'

const TodoItem = ({ item, refetch }) => {
	// sweet alert
	const MySwal = withReactContent(Swal)
	const [complete, setComplete] = useState(false)
	const [editButton, setEditButton] = useState(false)

	// handle update
	const handleUpdate = (e, _id) => {
		let updatedValue = e.target.value
		fetch(`https://todo-app-server-public.herokuapp.com/todo/update/${_id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ todo: updatedValue }),
		})
			.then(res => res.json())
			.then(data => {
				if (data.modifiedCount > 0) {
					refetch()
					toast('Congratulations!Todo updated successfully!')
				}
			})
	}

	// handle completed button
	const handleComplete = (e, _id) => {
		let isChecked = e.target.checked
		setComplete(isChecked)
		fetch(`https://todo-app-server-public.herokuapp.com/todo/${_id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => {
				if (data.modifiedCount > 0) {
					fetch(
						`https://todo-app-server-public.herokuapp.com/completed/${_id}`,
						{
							method: 'POST',
							headers: {
								'content-type': 'application/json',
							},
							body: JSON.stringify(item),
						}
					)
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

	const handleEditButton = id => {
		setEditButton(!editButton)
		if (!editButton) {
			toast('Please click on the text to edit!!')
		}
	}

	return (
		<div className='mx-auto w-full md:w-1/2 my-6 h-16 rounded-lg shadow-md px-4 hover:outline'>
			{/* <p>Name:{item.todo}</p> */}
			<div className='form-control'>
				<div className='label cursor-pointer'>
					{/* complete */}
					{item.status === 'completed' ? (
						<strike className='label-text text-xl'>
							{item.todo}
							<div className='badge badge-primary'>completed</div>{' '}
						</strike>
					) : (
						<input
							onBlur={e => handleUpdate(e, item._id)}
							type='text'
							name='update'
							defaultValue={item.todo}
							// defavalue={item.todo}
							className='label-text text-xl'
						></input>
					)}
					<button
						onClick={e => handleDelete(e, item._id)}
						className='btn btn-xs'
					>
						Delete
					</button>
					<button
						onClick={() => handleEditButton(item._id)}
						className='btn btn-xs'
						disabled={item.status === 'completed'}
					>
						{editButton ? 'Update' : 'Edit'}
					</button>
					<input
						type='checkbox'
						name='complete'
						disabled={item.status === 'completed'}
						onChange={e => handleComplete(e, item._id)}
						className='checkbox checkbox-primary'
					/>
				</div>
			</div>
		</div>
	)
}

export default TodoItem
