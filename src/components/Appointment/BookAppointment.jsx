import { useEffect, useState } from "react"
import BookingCart from "./BookingCart";
import toast from "react-hot-toast";

export default function BookAppointment({ date }) {

    const [bookindData, setBookingData] = useState([]);
    // const [selectedAppointment, setSelectedAppointment] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/booking')
            .then(res => res.json())
            .then(data => setBookingData(data))
    }, []);

    // const handleAppointment = (product) => {
    //     const exists = bookindData.find(pd => pd.id === product.id)
    //     setSelectedAppointment(exists);
    //     addToDb(product.id)
    // }

    return (
        <div className='md:pt-10 md:pl-20'>
            <div className="md:pr-16 p-2">
                <h1 className='border-cyan-500 border-y border-x-8 md:text-5xl md:pr-30 md:pb-5 text-center text-3xl p-8'>Available Appointments on {date.toDateString()}</h1>
            </div>
            <div className='md:grid md:grid-cols-3 md:gap-26 md:pb-5 grid grid-row-2 gap-8 m-4'>
                {
                    bookindData.map(booking => <BookingCart key={booking.id} booking={booking} date={date}></BookingCart>)
                }
            </div>
        </div>
    )
}
