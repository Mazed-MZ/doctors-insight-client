import { useContext, useEffect, useState } from 'react';
import AppointmentCelander from './AppointmentCelander';
import { UserContext } from '../../providers/AuthProviders';
import { Helmet } from 'react-helmet-async';

export default function MyAppointment() {

    const { user, setUser } = useContext(UserContext);
    const [selectedDate, setselectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    const handleDateChange = (date) => {
        // const appointmentDate = date.toArray();
        setselectedDate(date);
        // console.log(date);

        fetch('http://localhost:5000/appointmentbydate', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ date, email: user.email })
        })
            .then(res => res.json())
            .then(data => setAppointments(data))
    }
    console.log(appointments);

    // useEffect(() => {
    //     fetch('http://localhost:5000/appointmentsbydate', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ date: selectedDate, email: user.email })
    //     })
    //         .then(res => res.json())
    //         .then(data => setAppointments(data))
    // }, [selectedDate])

    return (
        <div className="md:pt-28 pt-12">
            <Helmet>
                <title>Doctor's Insight | My Appointment</title>
            </Helmet>
            <h1 className="text-center md:text-5xl text-3xl pt-12 md:pt-0">Show all appointments on a particular date</h1>
            <div className="md:grid md:grid-cols-2 md:ml-30 md:mr-36 md:mb-20">
                <div className="p-12 md:ml-36">
                    <AppointmentCelander handleDateChange={handleDateChange}></AppointmentCelander>
                </div>
                <div className="mt-12">
                    <div className="overflow-x-auto">
                        <table className="table table-xs">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='md:text-lg'>No.</th>
                                    <th className='md:text-lg'>Patient Name</th>
                                    <th className='md:text-lg'>Name of Disease</th>
                                    <th className='md:text-lg'>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    appointments.map((appointmentList, index) =>
                                        <tr key={appointmentList.id}>
                                            <td className='md:text-lg'>{index + 1}</td>
                                            <td className='md:text-lg'>{appointmentList.patient}</td>
                                            <td className='md:text-lg'>{appointmentList.name}</td>
                                            <td className='md:text-lg'>{appointmentList.email}</td>
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
