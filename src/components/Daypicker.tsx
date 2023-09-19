import React, { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

interface Options {
  title: string;
  autoHide: boolean;
  todayBtn: boolean;
  clearBtn: boolean;
  maxDate: Date;
  minDate: Date;
  theme: {
    background: string;
    todayBtn: string;
    clearBtn: string;
    icons: string;
    text: string;
    disabledText: string;
    input: string;
    inputIcon: string;
    selected: string;
  };
  icons: {
    prev: () => JSX.Element;
    next: () => JSX.Element;
  };
  datepickerClassNames: string;
  language: string;
}

const options: Options = {
  title: "Chọn ngày sinh",
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date(Date.now()),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-light-5",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-red-200",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  language: "vi",
  autoHide: true,
};

interface Props {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  handleChange: (selectedDate: Date) => void;
}

const DemoComponent = ({
  selectedDate,
  setSelectedDate,
  handleChange,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);

  // const handleChange = (selectedDate: Date) => {
  // 	setSelectedDate(selectedDate);
  // 	console.log("date", selectedDate);
  // };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    // <div className="lg:w-40 phone:w-10 h-30 border-primary-1 rounded-lg">
    <div
      style={{
        width: "150px",
        height: "33px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #e2e8f0",
      }}
      className="rounded-sm border-primary-1"
    >
      {/* https://github.com/OMikkel/tailwind-datepicker-react */}
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      ></Datepicker>
    </div>
  );
};

export default DemoComponent;
