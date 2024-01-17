import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div>
            <div className="drawer hidden md:block">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer">
                        <svg htmlFor="my-drawer" xmlns="http://www.w3.org/2000/svg" className="h-12 w-16 p-2 m-3 btn btn-square" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/myappointment">My Appointments</Link></li>
                        <li><Link to="/admin">Admin Panal</Link></li>
                        <li><a>Prescription</a></li>
                        <li><a>Settings</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
