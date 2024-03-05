import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../providers/AuthProviders'
import useAdmin from '../Shared/useAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { Chip } from '@mui/material';
import useAppointments from '../Shared/useAppointments';

export default function Navbar() {

    const { user, logout } = useContext(UserContext);
    const [isAdmin] = useAdmin();
    const [appointments] = useAppointments();
    // console.log(appointments.length);

    const handlelogout = () => {
        logout()
            .then(() => { })
            .catch((error) => { console.error(error) })
    }

    // ----->>> Theme Setup Code <<<---
    // const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    // useEffect(()=>{
    //     localStorage.setItem("theme", theme);
    //     const localTheme = localStorage.getItem("theme");
    //     document.querySelector("html").setAttribute("data-theme", localTheme);
    // },[theme]);

    // const handleToggle = (e) =>{
    //     if(e.target.checked){
    //         setTheme("night");
    //     }
    //     else{
    //         setTheme("light");
    //     }
    // }

    return (
        <div className="navbar fixed z-10 bg-blue-500 md:text-white md:pr-56 md:pl-56">
            <div className="navbar-start">

                {/* -------->> Mobile Device <<-------- */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/appointment">Appointment</Link></li>
                        <li>
                            <details>
                                <summary>Surgeons</summary>
                                <ul className="p-2 md:md:w-72 md:text-xl md:text-black">
                                    <li><a>Orthopedic surgeons</a></li>
                                    <li><a>Cardiac surgeons</a></li>
                                    <li><a>General surgeons</a></li>
                                    <li><a>Radiology surgeons</a></li>
                                    <li><a>Neurology surgeons</a></li>
                                    <li><a>Psychiatric surgeons</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Contact Us</a></li>
                        {
                            user ? <span className='hidden'>Hidden</span> : <li><Link to="/login">Login</Link></li>
                        }
                    </ul>
                </div>
                <Link to="/"><img className='w-36 md:w-50' src="https://i.ibb.co/DfsPcGz/doctors-insight.png" alt="doctors-insight" border="0" /></Link>
            </div>

            {/* ----->> Large Device <<<--- */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal md:mr-40 md:text-xl">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/appointment">Appointment</Link></li>
                    <li>
                        <details>
                            <summary>Surgeons</summary>
                            <ul className="p-2 md:md:w-72 md:text-xl md:text-black">
                                <li><a>Orthopedic surgeons</a></li>
                                <li><a>Cardiac surgeons</a></li>
                                <li><a>General surgeons</a></li>
                                <li><a>Radiology surgeons</a></li>
                                <li><a>Neurology surgeons</a></li>
                                <li><a>Psychiatric surgeons</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Contact Us</a></li>
                </ul>
            </div>
            {
                user ? <span className='hidden'>Hidden</span> : <div className="navbar-center hidden md:block">
                    <Link to="/login" className="btn bg-info text-white md:text-xl">Login</Link>
                </div>
            }

            <div className="dropdown dropdown-end">
                {
                    user && !isAdmin ? <div tabIndex={0} role="button" className="btn btn-ghost md:ml-0 md:pt-3 md:mr-32 hidden md:block btn-circle">
                        <div className="indicator">
                            <FontAwesomeIcon icon={faHospitalUser} size="2xl" style={{ color: "#fafafa", }} />
                            <span className="badge badge-sm indicator-item">+{appointments?.length || 0}</span>
                        </div>
                    </div> : <span className="md:hidden"></span>
                }
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-72 shadow bg-accent text-black">
                    <div className="card-body text-left">
                        <span className="font-bold text-lg text-white">+{appointments?.length || 0} Appointments applied</span>
                        <div className="card-actions">
                            <Link to="/myappointment"><button className="btn text-center btn-black btn-block">View appointments</button></Link>
                        </div>
                    </div>
                </div>
            </div>

            {
                user ? <div className="dropdown dropdown-end ml-20 md:ml-0">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                        <div className="md:w-14 rounded-full">
                            {
                                user ? <img alt="Profile Photo" src={user.photoURL} /> : <span className='hidden'></span>
                            }
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 md:text-black">
                        {
                            isAdmin ?
                                <div>
                                    <li><Link to="">Admin Dashboard</Link></li>
                                    <li><Link to="users">All User</Link></li>
                                    <li><Link to="addDoctor">Add a doctor</Link></li>
                                    <li><Link to="manage-doctor">Manage Doctors</Link></li>
                                    <li><Link to="manage-services">Manage Services</Link></li>
                                </div> :
                                <div>
                                    <li><Link to="/profile" className="justify-between">Profile</Link></li>
                                    <li><Link to="myappointment">My Appointment</Link></li>
                                    <li><Link to="">My Reviews</Link></li>
                                    <li><Link to="">My History</Link></li>
                                    <li><Link to="/">Home</Link></li>
                                </div>
                        }

                        <li><a onClick={handlelogout}>Logout</a></li>
                    </ul>
                </div> : <span className='hidden'></span>
            }
        </div>
    )
}
