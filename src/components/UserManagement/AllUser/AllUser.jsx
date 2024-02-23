import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faMoneyBill, faReceipt, faStethoscope, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faCreditCard, faPenToSquare, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import useDoctor from '../../Shared/useDoctor';
import Swal from 'sweetalert2';
import allUser from '../../Shared/allUser';

export default function AllUser() {

    const [users, refetch] = allUser();
    console.log(users);

    const handleMakeAdmin = (userData) => {
        console.log(userData);
        fetch(`http://localhost:5000/user/admin/${userData._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${userData.displayName} is admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    const handleMakeUser = (userData) => {
        console.log(userData);
        fetch(`http://localhost:5000/user/make-user/${userData._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${userData.displayName} is user now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    const handleDeleteUser = (userData) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user's account will be remove",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/user/${userData.email}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Removed!",
                                text: "This user's account is removed.",
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
            <h1 className="text-center md:text-5xl text-3xl pt-12 md:pt-0">Manage All Users</h1>


            {/* ------>>>>> Desktop Version Statistics <<<<<------ */}
            <div className="hidden md:block text-center pt-12 pb-12">
                <div className="stats bg-cyan-800 shadow">
                    <div className="stat" data-aos="fade-left">
                        <div className="stat-title pb-3 text-white">User Icon</div>
                        <div className="stat-value text-white pb-3"><FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#FFD43B", }} /></div>
                        <div className="stat-desc text-white">Any user role can be changed by admin</div>
                    </div>

                    <div className="stat" data-aos="zoom-out">
                        <div className="stat-title text-white pb-3">Admin Icon</div>
                        <div className="stat-value text-white pb-3"><FontAwesomeIcon size="2xl" icon={faUserShield} style={{ color: "#63E6BE", }} /></div>
                        <div className="stat-desc text-white">Admin can change anything but the role of admin cannot be changed</div>
                    </div>

                    <div className="stat" data-aos="fade-right">
                        <div className="stat-title text-white pb-3">
                            Total User {users?.length}
                        </div>
                        <div className="stat-value pb-3"><div className="stat-figure text-secondary">
                            <div className="avatar online">
                                <div className="w-16 border-green-500 border-2 p-2 rounded-full">
                                    <FontAwesomeIcon icon={faAddressCard} style={{ color: "#FFD43B", }} />
                                </div>
                            </div>
                        </div></div>
                        <div className="stat-desc text-white">Users are continously increase day by day</div>
                    </div>

                </div>
            </div>





            {/* ------>>>> Mobile version statistics <<<<------ */}
            <div className="text-center md:hidden pt-12 pb-12">
                <div className="stats stats-vertical bg-cyan-800 shadow">
                    <div className="stat">
                        <div className="stat-title text-white pb-3">User Icon</div>
                        <div className="stat-value text-white pb-3"><FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#FFD43B", }} /></div>
                        <div className="stat-desc text-white">Any user role can be changed by admin</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title text-white pb-3">Admin Icon</div>
                        <div className="stat-value text-white pb-3"><FontAwesomeIcon size="2xl" icon={faUserShield} style={{ color: "#63E6BE", }} /></div>
                        <div className="stat-desc text-white">Admin can change anything but the role of admin cannot be changed</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title text-white pb-3">
                            Total User {users?.length}
                        </div>
                        <div className="stat-value pb-3"><div className="stat-figure text-secondary">
                            <div className="avatar online">
                                <div className="w-16 border-green-500 border-2 p-2 rounded-full">
                                    <FontAwesomeIcon icon={faAddressCard} style={{ color: "#FFD43B", }} />
                                </div>
                            </div>
                        </div></div>
                        <div className="stat-desc text-white">Users are continously increase day by day</div>
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
                                <th>User Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users.map((userData, index) =>
                                    <tr key={userData._id} className="border-b-3 border-amber-900">
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={userData.photoURL} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-bold">
                                            {userData.displayName}
                                        </td>
                                        <td className="font-bold">
                                            {userData.email}
                                        </td>
                                        {
                                            userData.role === 'admin' ? <td><button className="btn btn-ghost" onClick={() => handleMakeUser(userData)}><FontAwesomeIcon size="2xl" icon={faUserShield} style={{ color: "#63E6BE", }} /></button></td> : <td><button className="btn btn-ghost" onClick={() => handleMakeAdmin(userData)}><FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#FFD43B", }} /></button></td>
                                        }
                                        <td><button onClick={() => handleDeleteUser(userData)} className="btn btn-ghost"><FontAwesomeIcon icon={faTrashCan} size="2xl" style={{ color: "#ff5c5c", }} /></button></td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}
