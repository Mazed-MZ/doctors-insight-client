import { useState } from "react";
import AppointmentHeader from "./AppointmentHeader"
import BookAppointment from "./BookAppointment";


export default function Appointment() {

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
  return (
    <div>
      <AppointmentHeader handleDateChange={handleDateChange}></AppointmentHeader>
      <BookAppointment date={selectedDate}></BookAppointment>
    </div>
  )
}
