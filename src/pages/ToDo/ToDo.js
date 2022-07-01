import React from 'react'

const ToDo = () => {
	const handleSubmit = e => {
		e.preventDefault()
		console.log('Form submitted')
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Type here'
					class='input input-bordered input-primary w-full max-w-xs'
				/>
				<input className='btn' type='submit' value='Add Task' />
			</form>
		</div>
	)
}

export default ToDo
