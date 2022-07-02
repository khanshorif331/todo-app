import { format } from 'date-fns'
import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const Calender = () => {
	const [selected, setSelected] = useState()
	let footer = <p>Please pick a day.</p>
	if (selected) {
		footer = <p>You picked {format(selected, 'PP')}.</p>
	}
	return (
		<div className='w-full mx-auto'>
			{/* <h1>This is calender.</h1> */}
			<DayPicker
				className='w-full md:w-1/2 mx-auto shadow-lg p-2 md:p-10 rounded-lg'
				mode='single'
				selected={selected}
				onSelect={setSelected}
				footer={footer}
			></DayPicker>
		</div>
	)
}

export default Calender
