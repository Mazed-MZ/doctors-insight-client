import { useContext, useEffect, useState } from 'react';
import AppointmentCelander from './AppointmentCelander';
import { UserContext } from '../../providers/AuthProviders';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import useAppointments from '../../Shared/useAppointments';
import { reload } from 'firebase/auth';

export default function MyAppointment() {

    const { user, setUser } = useContext(UserContext);
    const [selectedDate, setselectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [ , refetch] = useAppointments();

    const handleDateChange = (date) => {
        // const appointmentDate = date.toArray();
        setselectedDate(date);
        // console.log(date);

        fetch('https://doctors-insight-server.onrender.com/appointmentbydate', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ date, email: user.email })
        })
            .then(res => res.json())
            .then(data => setAppointments(data))
    }
    // console.log(appointments);

    // useEffect(() => {
    //     fetch('https://doctors-insight-server.onrender.com/appointmentsbydate', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ date: selectedDate, email: user.email })
    //     })
    //         .then(res => res.json())
    //         .then(data => setAppointments(data))
    // }, [selectedDate])

    const handleDelete = (appointmentList) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure to cancel ${appointmentList.name} appointment`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel appointment!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://doctors-insight-server.onrender.com/appointments/${appointmentList._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            location.reload()
                            Swal.fire({
                                title: "Removed!",
                                text: `Your ${appointmentList.name} appointment is canceled`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

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
                                <tr className="bg-slate-700 text-white">
                                    <th className='md:text-lg'>No.</th>
                                    <th className='md:text-lg'>Patient Name</th>
                                    <th className='md:text-lg'>Name of Disease</th>
                                    <th className='md:text-lg'>Email</th>
                                    <th className='md:text-lg'>Price</th>
                                    <th className='md:text-lg'>Payment</th>
                                    <th className='md:text-lg'>Cancel</th>
                                </tr>
                            </thead>
                            <tbody className="bg-teal-200">
                                {
                                    appointments.map((appointmentList, index) =>
                                        <tr key={appointmentList.id}>
                                            <td className='md:text-sm font-bold'>{index + 1}</td>
                                            <td className='md:text-sm font-bold'>{appointmentList.patient}</td>
                                            <td className='md:text-sm font-bold'>{appointmentList.name}</td>
                                            <td className='md:text-sm font-bold'>{appointmentList.email}</td>
                                            <td className='md:text-sm font-bold'>{appointmentList.price}</td>
                                            <td>
                                                {
                                                    appointmentList.email === user?.email ? <Link to={`/payment/${appointmentList._id}`}><button className="btn btn-outline btn-warning">Payment</button></Link> : <span className='hidden'></span>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    appointmentList.email === user?.email ? <button onClick={() => handleDelete(appointmentList)} className='btn btn-ghost'><FontAwesomeIcon icon={faTrash} size="2xl" style={{ color: "#ec4b4b", }} /></button> : <span className='hidden'></span>
                                                }
                                            </td>
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
