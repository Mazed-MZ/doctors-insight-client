import { Link } from 'react-router-dom'

export default function Navbar() {

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
        <div className="navbar bg-blue-500 md:text-white md:pr-56 md:pl-56">
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
                    </ul>
                </div>
                <Link><img className='w-36 md:w-52' src="https://i.ibb.co/DfsPcGz/doctors-insight.png" alt="doctors-insight" border="0" /></Link>
            </div>

            {/* ----->> Large Device <<<--- */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 md:text-xl">
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
            <div className="navbar-end">
                <a className="btn md:text-xl">Login</a>
            </div>
        </div>
    )
}
