import { faHospitalUser, faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function ContentTwo() {
    return (
        <div>
            <div className='bg-cover bg-[url("https://healyantra.com/wp-content/uploads/2023/09/GIF-Website-11.gif")]'>


                {/* ------>>>State Section<<<----- */}
                <div className='md:pt-40 md:pb-18 backdrop-blur-sm bg-white/70 text-center hidden md:block'>
                    <h1 className='text-4xl p-12'>Surgeons State</h1>
                    <div className="stats shadow">

                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <FontAwesomeIcon icon={faStethoscope} beat size="2xl" style={{ color: "#b90fdb", }} className="inline-block w-8 h-8 stroke-current" />
                            </div>
                            <div className="stat-title">Total Surgery</div>
                            <div className="stat-value text-primary">25.6K</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FontAwesomeIcon icon={faHospitalUser} flip size="2xl" style={{ color: "#14acd2", }} className="inline-block w-8 h-8 stroke-current" />
                            </div>
                            <div className="stat-title">Patients (per month)</div>
                            <div className="stat-value text-secondary">2.6M</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 rounded-full">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNaPjEQtjOevclYO6Pbl4KAcxf6WtOiVuEg&usqp=CAU" />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-title">Operation Success Rate</div>
                            <div className="stat-value text-accent">86%</div>
                            <div className="stat-desc text-nutral">31 tasks remaining</div>
                        </div>

                    </div>
                </div>

                {/* ---->>> Appointment section <<---- */}

                <div className='md:flex md:pl-56 backdrop-blur-sm bg-white/70 md:pr-40 md:pt-56 md:pb-20'>
                    <div className='md:w-3/4 p-12 md:text-left text-start'>
                        <h1 className='md:text-5xl pb-5 text-5xl'>Make an appointment Today</h1>
                        <p className='pb-5'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page</p>
                        <button className="btn btn-outline btn-accent">Get Appointment</button>
                    </div>
                    <div className='md:flex-initial md:w-5/6 md:p-10 p-5'><img className='rounded-xl md:h-96' src="https://www.idealsmiledentistry.pk/wp-content/uploads/2021/06/dental-doctor.jpg" alt="" /></div>
                </div>
            </div>
        </div>
    )
}
