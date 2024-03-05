import React from 'react'
import useServices from '../../Shared/useServices'
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faMoneyBill, faReceipt, faStethoscope, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faCreditCard, faPenToSquare, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ManageServices() {

    const [services, refetch] = useServices();

    const handleDelete = (serviceData) => {
        // console.log(docs._id)
        Swal.fire({
            title: "Are you sure?",
            text: `${serviceData.name} will remove from appointment list`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/services/${serviceData._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "This service has been removed from appointment list.",
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
                <title>Doctor's Insight | Services</title>
            </Helmet>
            <h1 className="text-center md:text-5xl text-3xl pt-12 md:pt-0">Manage All Services</h1>


            {/* ------>>>>> Desktop Version Statistics <<<<<------ */}
            <div className="hidden md:block text-center pt-12 pb-12">
                <div className="stats shadow">
                    <div className="stat" data-aos="fade-up">
                        <div className="stat-figure text-secondary">
                            <FontAwesomeIcon icon={faStethoscope} fade size="2xl" />
                        </div>
                        <div className="stat-title">TOTAL SERVICES</div>
                        <div className="stat-value">{services?.length || 0}</div>
                        <div className="stat-desc">We are ready to serve</div>
                    </div>
                </div>
            </div>





            {/* ------>>>> Mobile version statistics <<<<------ */}
            <div className="text-center md:hidden pt-12 pb-12">
                <div className="stats stats-vertical shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FontAwesomeIcon icon={faStethoscope} fade size="2xl" />
                        </div>
                        <div className="stat-title">TOTAL SERVICES</div>
                        <div className="stat-value">{services?.length || 0}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
            </div>








            <div className="md:ml-28 md:mr-28">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-cyan-500 text-warning font-thin">
                            <tr>
                                <th className='text-white'>
                                    No.
                                </th>
                                <th className='text-white'>Name</th>
                                <th className='text-white'>Slot</th>
                                <th className='text-white'>Space</th>
                                <th className='text-white'>Price</th>
                                <th className='text-white'>Update</th>
                                <th className='text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                services.map((serviceData, index) =>
                                    <tr key={serviceData._id} className="border-b-3 border-amber-900">
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td className="font-bold">
                                            {serviceData.name}
                                        </td>
                                        <td className="font-bold">
                                            {serviceData.slots.length}
                                        </td>
                                        <td className="font-bold">
                                            {serviceData.space}
                                        </td>
                                        <td className="font-bold">
                                            ${serviceData.price}
                                        </td>
                                        <td>
                                            <Link to={`/updateService/${serviceData._id}`}><button className="btn btn-ghost"><FontAwesomeIcon icon={faPenToSquare} size="2xl" style={{ color: "#63E6BE", }} /></button></Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(serviceData)} className="btn btn-ghost"><FontAwesomeIcon icon={faTrashCan} size="2xl" style={{ color: "#fb325a", }} /></button>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
