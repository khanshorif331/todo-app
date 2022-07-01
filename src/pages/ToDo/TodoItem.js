import React, { useState } from 'react'

const TodoItem = ({ item }) => {
	const [value, setValue] = useState(false)
	// console.log(item._id)
	const handleComplete = (e, _id) => {
		let isChecked = e.target.checked
		setValue(isChecked)
		console.log(_id, isChecked)
	}
	console.log(value, 'value')
	return (
		<div className='mx-auto w-full md:w-1/2 my-6 h-16 rounded-lg shadow-md px-4 hover:outline'>
			{/* <p>Name:{item.todo}</p> */}
			<div class='form-control'>
				<label class='label cursor-pointer'>
					{value ? (
						<strike class='label-text'>{item.todo}</strike>
					) : (
						<span class='label-text'>{item.todo}</span>
					)}
					<input
						type='checkbox'
						name='complete'
						onChange={e => handleComplete(e, item._id)}
						// checked='checked'
						class='checkbox checkbox-primary'
					/>
				</label>
			</div>
		</div>
	)
}

export default TodoItem
