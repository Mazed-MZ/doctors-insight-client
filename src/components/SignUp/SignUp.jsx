import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { UserContext } from "../providers/AuthProviders";
import { Divider } from '@mui/material';
import toast from 'react-hot-toast';
import useAxiosPublic from '../Shared/useAxiosPublic';
import Swal from 'sweetalert2';
import { GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export default function SignUp() {

    const { createUserWithEmail, googleSignin } = useContext(UserContext);
    const axiosPublic = useAxiosPublic();

    const [showMessage, setMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/';

    const [file, setFile] = useState(null);

    // // --->>> File Upload <<<---
    const handleFileChange = e => {
        const newFile = e.target.files[0];
        setFile(newFile);
        console.log(newFile);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const user = { name, email, password };
        // console.log(user);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        console.log(formData)

        //create user in firebase
        createUserWithEmail(email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                navigate(from, { replace: true });
                console.log(user.uid);
                axiosPublic.post('/users', formData)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data) {
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: "User created successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/');
                        }
                    })
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setMessage(errorCode, errorMessage)
                // ..
            });
    }

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'id') {
            const isIdValid = e.target.value.length > 6;
            const IdUseNumber = /\d{1}/.test(e.target.value);
            isFormValid = isIdValid && IdUseNumber;
        }
        if (isFormValid) {
            console.log('form is valied')
        }
        else {
            alert('❗❗❗Sorry! your given information is invalid');
        }
    }

    const handleGoogleSignin = () => {
        googleSignin(provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
                axiosPublic.post('/googleuser', user)
                    .then(res => {
                        if (res.data) {
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: "User created successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                console.log(errorMessage)
                // ...
            });
    }

    return (
        <div className='md:bg-cover md:bg-[url("https://i.ibb.co/Y3C5Jv9/vecteezy-smiling-woman-in-white-coat-holding-documents-and-standing-27183645.jpg")] bg-cover bg-[url("https://img.freepik.com/premium-photo/doctor-s-stethoscope-blue-background_132254-2077.jpg")]'>
            <div className="hero md:pt-32 text-center pt-20 pb-40 md:pb-72">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:text-white md:pl-20 lg:text-left">
                        <h1 className="md:text-8xl text-5xl font-bold">Welcome to Doctors Insight</h1>
                        <h1 className="text-5xl">Sign Up Now</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        {
                            showMessage ? <div className="badge badge-error text-white md:text-3xl md:p-8 p-5 text-xl">{showMessage}</div> : <span className="hidden"></span>
                        }
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-500 bg-opacity-75 text-white md:text-black md:glass">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text md:text-black text-white font-bold">Type your name</span>
                                </label>
                                <input type="text" name="name" placeholder="Full name" className="bg-slate-200 p-3 rounded-lg input-primary" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black font-bold">Upload Profile Photo</span>
                                </label>
                                <input onChange={handleFileChange} type="file" className="file-input file-input-bordered file-input-secondary w-full" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text md:text-black text-white font-bold">Email</span>
                                </label>
                                <input onBlur={handleBlur} type="email" name="email" placeholder="email" className="bg-slate-200 p-3 rounded-lg input-primary" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text md:text-black text-white font-bold">Password</span>
                                </label>
                                <input onBlur={handleBlur} type="password" name="password" placeholder="password" className="bg-slate-200 p-3 rounded-lg input-primary" required />
                                <label className="label">
                                    <span className="label-text md:text-black text-white font-bold badge hover:text-red-500 mb-3 gap-2">Use at least 6 character with number</span>
                                </label>
                            </div>
                            <label className="label">
                                <Link to="/login" className="label-text-alt flex link link-hover md:text-black text-white font-bold">Already have an account? <p className="text-info pl-1">Login</p></Link>
                            </label>
                            <div className="form-control grid grid-cols-2 gap-3">
                                <button className="btn btn-secondary md:text-black text-white" type="submit">SIGN UP</button>
                                <button onClick={handleGoogleSignin} className="btn btn-secondary md:text-black text-white">CONTINUE WITH GOOGLE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
