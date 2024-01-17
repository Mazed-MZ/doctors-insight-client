import { useContext, useEffect, useState } from 'react';
import AppointmentCelander from './AppointmentCelander';
import { UserContext } from '../../providers/AuthProviders';

export default function MyAppointment() {

    const {user, setUser} = useContext(UserContext);
    const [selectedDate, setselectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    const handleDateChange = (date) => {
        // const appointmentDate = date.toArray();
        setselectedDate(date);
    }

    useEffect(() => {
        fetch('http://localhost:5000/appointmentsbydate', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ date: selectedDate, email: user.email })
        })
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [selectedDate])

    return (
        <div className="pt-12">
            <h1 className="text-center md:text-5xl text-3xl pt-12 md:pt-0">Show all appointments on a particular date</h1>
            <div className="md:grid md:grid-cols-2 md:ml-30 md:mr-36 md:mb-20">
                <div className="p-12 md:ml-56">
                    <AppointmentCelander handleDateChange={handleDateChange}></AppointmentCelander>
                </div>
                <div className="mt-12">
                    <div className="overflow-x-auto">
                        <table className="table table-xs">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Patient Name</th>
                                    <th>Name of Disease</th>
                                    <th className="hidden md:block">Time</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    appointments.map((appointmentList, index) =>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{appointmentList.patient}</td>
                                            <td>{appointmentList.name}</td>
                                            <td className="hidden md:block">{appointmentList.time}</td>
                                            <td>{appointmentList.email}</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
