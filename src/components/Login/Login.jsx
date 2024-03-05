import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { UserContext } from "../providers/AuthProviders";
import { Divider } from '@mui/material';
import Swal from 'sweetalert2';

const provider = new GoogleAuthProvider();

export default function Login() {

  const { signinwithpass, googleSignin } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signinwithpass(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate(from, { replace: true });
        if (user.uid) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "User Loggedin successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${errorMessage}!`,
          });
        }
      });
  }


  const handleGoogleSignin = () => {
    googleSignin(provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // console.log(user);
        navigate(from, { replace: true });
        if (user.uid) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "User Loggedin successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        // console.log(errorMessage)
        // ...
      });
  }
  return (
    <div className='md:bg-cover md:bg-[url("https://i.ibb.co/DKVC4RR/pexels-etatics-inc-13105351.jpg")] bg-cover bg-[url("https://www.shutterstock.com/image-vector/close-doctors-lab-white-coat-600nw-146995097.jpg")]'>
      <div className="hero md:pt-48 text-center md:pl-20 md:pr-20 pb-40 pt-36 md:pb-72">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:text-white md:pl-20 lg:text-left">
            <h1 className="md:text-8xl text-5xl font-bold">Sign in</h1>
            <p className="hidden md:block py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-500 bg-opacity-75 text-white md:text-black md:glass">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text md:text-black text-white font-bold">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="bg-slate-200 p-3 rounded-lg input-primary" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text md:text-black text-white font-bold">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="bg-slate-200 p-3 rounded-lg input-primary" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover md:text-black text-white font-bold">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-1">
                <button className="btn btn-secondary md:text-black text-white" type="submit">LOGIN</button>
                <label className="label">
                  <Link to="/signup" className="label-text-alt flex link link-hover md:text-black text-white font-bold">New to Doctors Portal? <p className="text-info pl-1">Sign Up here</p></Link>
                </label>
                <Divider>Or</Divider>
                <button onClick={handleGoogleSignin} className="btn btn-secondary md:text-black text-white mt-3">CONTINUE WITH GOOGLE</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
