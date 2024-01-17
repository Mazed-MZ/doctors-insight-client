import React, { useEffect, useState } from 'react';
import Doctors from './doctors';
import { useLoaderData } from 'react-router-dom';

export default function AvailableDoctors() {

    // const doctors = useLoaderData();
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/addDoctor')
            .then(res => res.json())
            .then(data => setDoctors(data))
    }, [])
    console.log(doctors);
    return (
        <div className='md:pb-12 md:pt-28 pt-12'>
            <h1 className='text-4xl text-center border-cyan-500 border-y border-x-8 md:text-5xl md:pr-30 md:pb-5 m-8 p-8'>Board Of Directors</h1>
            <div className='pt-8 md:grid md:grid-cols-3 gap-5 md:pl-24 pl-8'>
                {
                    doctors.map(docInfo => <Doctors docInfo={docInfo} key={docInfo.id}></Doctors>)
                }
            </div>
        </div>
    )
}
