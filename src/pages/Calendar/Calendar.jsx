import React, { useState } from "react";
import CalendarComponent from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const toDayDate = new Date();
  const [value, onChange] = useState(toDayDate);

  return (
    <div>
      <div className="text-center font-semibold text-2xl my-6 uppercase font-serif border-b-2 border-black pb-2 w-52 mx-auto ">
        Calendar
      </div>
      <div className="flex items-center justify-center">
        <CalendarComponent onChange={onChange} value={value} />
      </div>
     
    </div>
  );
};

export default MyCalendar;
