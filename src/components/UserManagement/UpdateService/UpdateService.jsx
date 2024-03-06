import { Box, TextField } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UpdateService() {

    const update = useLoaderData();
    // console.log(update);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const space = form.space.value;
        const price = form.price.value;
        const newItemData = { name, space, price };
        // console.log(newItemData);

        Swal.fire({
            title: `Are you confirm to update this ${update.name}?`,
            text: "You can change this service in appointment list anytime",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Upgrade it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://doctors-insight-server.onrender.com/services/${update._id}`, {
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
                                title: `${update.name} is updated`,
                                text: `Latest ${update.name} item is added in your appointment`,
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
                <title>Doctor's Insight | Update Service</title>
            </Helmet>
            <form className="job-form text-center" onSubmit={handleSubmit}>
                <p className='border-cyan-500 border-y border-x-8 md:pr-30 md:pb-5 text-center md:text-5xl text-3xl p-3 md:mt-5'>Update Service</p>
                <TextField
                    id="filled-multiline-flexible"
                    name="name"
                    defaultValue={update?.name}
                    label="Name"
                    sx={{ m: 5, width: '35ch' }}
                    placeholder="Add service name"
                    multiline
                    maxRows={4}
                    variant="filled"
                />
                <TextField
                    id="filled-multiline-flexible"
                    name="space"
                    defaultValue={update?.space}
                    label="Space"
                    sx={{ m: 5, width: '35ch' }}
                    placeholder="Number of space"
                    multiline
                    maxRows={4}
                    variant="filled"
                />
                <TextField
                    id="filled-multiline-flexible"
                    name="price"
                    defaultValue={update?.price}
                    label="Price"
                    sx={{ m: 5, width: '35ch' }}
                    placeholder="$"
                    multiline
                    maxRows={4}
                    variant="filled"
                />
                <input type="submit" className="btn btn-success mt-12" placeholder='UPDATE' />
            </form>
        </div>
    )
}
