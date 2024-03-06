import { Box, TextField } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UpdateDoctor() {

    const updateDoc = useLoaderData();
    // console.log(updateDoc);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const image = form.image.value;
        const speciality = form.speciality.value;
        const email = form.email.value;
        const newItemData = { name, image, speciality, email };
        // console.log(newItemData);

        Swal.fire({
            title: `Are you confirm to update ${updateDoc.name} information?`,
            text: "You can change this service in appointment list anytime",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Upgrade it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://doctors-insight-server.onrender.com/docInfo/${updateDoc._id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newItemData)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        if (data.modifiedCount > 0) {
                            Swal.fire({
                                title: `${updateDoc.name} is updated`,
                                text: `Latest ${updateDoc.name} information is added in Doctors Panal`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div className='md:pt-28 pt-28'>
            <Helmet>
                <title>Doctor's Insight | Update Doctors Information</title>
            </Helmet>
            <form className="job-form text-center" onSubmit={handleSubmit}>
                <p className='border-cyan-500 border-y border-x-8 md:pr-30 md:pb-5 text-center md:text-5xl text-3xl p-3 md:mt-5'>Update Service</p>
                <TextField
                    id="filled-multiline-flexible"
                    name="name"
                    defaultValue={updateDoc?.name}
                    label="Name"
                    sx={{ m: 5, width: '35ch' }}
                    placeholder="Add doctor name"
                    multiline
                    maxRows={4}
                    variant="filled"
                />
                <TextField
                    id="filled-multiline-flexible"
                    name="image"
                    defaultValue={updateDoc?.image}
                    label="Doctors Image"
                    sx={{ m: 5, width: '35ch' }}
                    placeholder="http://www.image.jpg"
                    multiline
                    maxRows={4}
                    variant="filled"
                />
                <TextField
                    id="filled-multiline-flexible"
                    name="speciality"
                    defaultValue={updateDoc?.speciality}
                    label="Field Of Study"
                    sx={{ m: 5, width: '35ch' }}
                    placeholder="Specilized for..."
                    multiline
                    maxRows={4}
                    variant="filled"
                />
                <TextField
                    id="filled-multiline-flexible"
                    name="email"
                    defaultValue={updateDoc?.email}
                    label="Email Address"
                    sx={{ m: 5, width: '35ch' }}
                    placeholder="email@gmail.com"
                    multiline
                    maxRows={4}
                    variant="filled"
                />
                <input type="submit" className="btn btn-success mt-12" placeholder='UPDATE' />
            </form>
        </div>
    )
}
