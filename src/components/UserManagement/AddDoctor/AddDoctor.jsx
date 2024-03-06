import { useState } from "react";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

export default function Admin() {

    const [info, setInfo] = useState({});
    // const [file, setFile] = useState(null); // for file upload
    const [doctors, setDoctors] = useState([]);

    // const handleBlur = e => {
    //     const newInfo = { ...info };
    //     newInfo[e.target.name] = e.target.value;
    //     setInfo(newInfo);
    //     console.log(newInfo);
    // }
    // console.log(info);

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
            toast.success('✅Password and ID setup successfully');
        }
        else {
            alert('❗❗❗Sorry! your given information is invalid');
        }
    }

    const handleSubmit = (event) => {
        const form = event.target;
        const name = form.name.value;
        const speciality = form.speciality.value;
        const email = form.email.value;
        const image = form.image.value;
        const doctorsFiles = { name, speciality, email, image }
        // console.log(doctorsFiles);
        fetch('https://doctors-insight-server.onrender.com/addDoctor', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(doctorsFiles)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    alert('Doctor added successfully');
                    location.reload();
                }
            })
    }

    // --->>> File Upload <<<---
    // const handleFileChange = e => {
    //     const newFile = e.target.files[0];
    //     setFile(newFile);
    //     console.log(newFile);
    // }

    // --->>> File Upload <<<---
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('name', info.name);
    //     formData.append('email', info.email);

    //     fetch('https://doctors-insight-server.onrender.com/addDoctor', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(res => res.json())
    //         .then(data => setDoctors(data))
    // }

    return (
        <div className="pt-36 pb-16 text-center">
            <div className="mockup-phone">
                <div className="camera"></div>
                <div className="display">
                    <div className="hero md:p-12 bg-red-100">
                        <div className="card card-side bg-base-100 shadow-xl md:flex-row-reverse flex-col-reverse p-5">
                            <figure className="md:w-72"><img src="https://cdn.dribbble.com/users/6498639/screenshots/15142979/media/4018bc54be33f8aae19fef3d64efdf6e.gif" alt="Movie" /></figure>
                            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Name"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '35ch' }}
                                        name="name"
                                        type="name"
                                        required
                                    />

                                    <TextField
                                        label="Field of study"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '35ch' }}
                                        name="speciality"
                                        type="text"
                                        required
                                    />


                                    <TextField
                                        id="outlined-multiline-flexible"
                                        name="email"
                                        label="Type email address"
                                        sx={{ m: 1, width: '35ch' }}
                                        multiline
                                        type="email"
                                        required
                                        onBlur={handleBlur}
                                        maxRows={4}
                                    />
                                    <TextField
                                        id="filled-multiline-flexible"
                                        name="image"
                                        label="Profile Photo URL"
                                        sx={{ m: 1, width: '35ch' }}
                                        placeholder=""
                                        multiline
                                        type="image"
                                        required
                                        maxRows={4}
                                        variant="filled"
                                    />
                                    <input className="btn btn-square btn-success w-full" type="submit" placeholder="Apply" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
