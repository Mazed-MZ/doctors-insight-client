import Calendar from "react-calendar";

export default function AppointmentCelander({ handleDateChange }) {


    return (
        <div className="">
            <Calendar className="p-3 text-xl rounded-xl shadow-xl" onChange={handleDateChange} value={new Date()}></Calendar>
        </div>
    )
}
