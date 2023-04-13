import { useState } from "react"
import Datepicker from "tailwind-datepicker-react"

const options = {
	title: "Chọn ngày sinh",
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	maxDate: new Date(Date.now()),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "bg-red-300",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <span>Previous</span>,
		next: () => <span>Next</span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date(Date.now()),
	language: "en",
    }

    const DateTimePick = () => {
	const [show, setShow] = useState <boolean>(false)
	const handleChange = (selectedDate: Date) => {
		console.log(selectedDate)
	}
	const handleClose = (state: boolean) => {
		setShow(state)
	}

	return (
		<div>
			<Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
		</div>
	)
}

export default DateTimePick