import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faMoneyBill, faReceipt, faStethoscope, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faCreditCard, faPenToSquare, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import useDoctor from '../../Shared/useDoctor';
import Swal from 'sweetalert2';

export default function ManageDoctor() {

    const [doctors, refetch] = useDoctor();

    const handleDelete = (docs) => {
        // console.log(docs._id)
        Swal.fire({
            title: "Are you sure?",
            text: `${docs.name} will remove from Doctors Insight`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/docInfo/${docs._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "This Doctor has been removed from Doctors Insight.",
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
                <title>Doctor's Insight | Manage Doctor</title>
            </Helmet>
            <h1 className="text-center md:text-5xl text-3xl pt-12 md:pt-0">Doctors Management</h1>


            {/* ------>>>>> Desktop Version Statistics <<<<<------ */}
            <div className="hidden md:block text-center pt-12 pb-12">
                <div className="stats shadow">
                    <div className="stat" data-aos="fade-up">
                        <div className="stat-figure text-secondary">
                            <FontAwesomeIcon icon={faStethoscope} fade size="2xl" />
                        </div>
                        <div className="stat-title">NUMBER OF DOCTOR</div>
                        <div className="stat-value">{doctors?.length || 0}</div>
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
                        <div className="stat-title">NUMBER OF DOCTOR</div>
                        <div className="stat-value">{doctors?.length || 0}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
            </div>








            <div className="md:ml-28 md:mr-28">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-cyan-500 text-white font-thin">
                            <tr>
                                <th>
                                    No.
                                </th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Field of Study</th>
                                <th>Email</th>
                                <th>Info Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                doctors.map((docInfo, index) =>
                                    <tr key={docInfo._id} className="border-b-3 border-amber-900">
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={docInfo.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-bold">
                                            {docInfo.name}
                                        </td>
                                        <td>
                                            <div className="font-bold italic">{docInfo.speciality}</div>
                                        </td>
                                        <td>
                                            <div className="font-bold">{docInfo.email}</div>
                                        </td>
                                        <td>
                                            <Link to={`/updateDoctor/${docInfo._id}`}><button className="btn btn-ghost"><FontAwesomeIcon icon={faPenToSquare} size="2xl" style={{ color: "#63E6BE", }} /></button></Link>
                                        </td>
                                        <td><button onClick={() => handleDelete(docInfo)} className="btn btn-ghost"><FontAwesomeIcon icon={faTrashCan} size="2xl" style={{ color: "#ff5c5c", }} /></button></td>
                                        {/* <th>
                        <Link to={`/allMenu/${foodItem.menuItemId}`}><button className="btn btn-ghost btn-xs">Details</button></Link>
                      </th> */}
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}
