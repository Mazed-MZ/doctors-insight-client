import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { Chip } from '@mui/material';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import { executeInTheNextEventLoopTick } from '@mui/x-date-pickers/internals';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function BookingCart({ booking, date }) {

    const { name, id, slots, space, _id } = booking;

    const selectedDate = date.toDateString();
    const [allAppointments, setAllAppointments] = useState([]);
    const [spaces, setSpace] = useState([]);
    const [updateSpace, setUpdateSpace] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/booking')
            .then(res => res.json())
            .then(data => setAllAppointments(data))
    }, [])

    // ----->>>> Space Update <<<----
    
    // const handleJoblistCart = (id) => {
        // const newCart = [...cart, product];
        //-->> Handle quantity from storage to cart <<--
    //     let newCart = [];
    //     const exists = allAppointments.find(pd => pd.id === id);
    //     // console.log(exists)
    //     if (!exists) {
    //         allAppointments.space = 1;
    //         newCart = [...spaces, allAppointments];
    //     }
    //     else {
    //         exists.space = exists.space - 1;
    //         const remaining = spaces.filter(pd => pd.id !== allAppointments.id)
    //         newCart = [...remaining, exists];
    //     }
    //     setSpace(newCart);
    //     console.log(spaces);

    //     fetch(`http://localhost:5000/appointment/${booking.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({spaces})
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data)
    //             if (data.insertedId) {
    //                 alert('You booked your appointment');
    //             }
    //         })
    // }


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFormSubmit = (event) => {
        handleOpen();
        // console.log(event);
        const form = event.target;
        // const title = form.title.value;
        const time = form.slot.value;
        const patient = form.patient.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const appointmentData = { id, name, space, date, time, patient, phone, email };
        // setSpace(appointmentData);
        fetch('http://localhost:5000/appointment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    alert('You booked your appointment');
                }
            })
    }

    return (
        <div>
            <div className="card w-96 bg-neutral shadow-xl text-white">
                <div className="card-body text-center">
                    <h2 className="font-bold text-xl text-center">{name}</h2>
                    <p>{space} spaces are available</p>
                    <button className="w-75 btn btn-success" onClick={handleOpen}>BOOK APPOINTMENT</button>
                </div>
            </div>

            {/* ----->>>Modal Section<<<<------ */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <form className="job-form" onSubmit={handleFormSubmit}>
                            <h1 className='text-center text-5xl text-slate-500' id="keep-mounted-modal-title">
                                {name}
                            </h1>
                            <p className='border-cyan-500 border-y border-x-8 md:pr-30 md:pb-5 text-center md:text-xl p-3 md:mt-5'>Appointment Form</p>
                            <div className="mt-3 mb-1 text-center">
                                <Chip label={selectedDate} color="primary" />
                            </div>
                            <select name="slot"
                                required className="select select-info w-full h-14 mt-4 md:max-w-xs mb-5">
                                <option disabled selected>Select Your Appointment Time</option>
                                <option>{slots[0]}</option>
                                <option>{slots[1]}</option>
                                <option>{slots[2]}</option>
                                <option>{slots[3]}</option>
                                <option>{slots[4]}</option>
                                <option>{slots[5]}</option>
                                <option>{slots[6]}</option>
                                <option>{slots[7]}</option>
                                <option>{slots[8]}</option>
                                <option>{slots[9]}</option>
                                <option>{slots[10]}</option>
                                <option>{slots[11]}</option>
                                <option>{slots[12]}</option>
                                <option>{slots[13]}</option>
                                <option>{slots[14]}</option>
                                <option>{slots[15]}</option>
                            </select>
                            <TextField
                                id="outlined-multiline-flexible"
                                name="patient"
                                type="text"
                                label="Full name"
                                multiline
                                required
                                sx={{ m: 2, width: '35ch' }}
                            />
                            <TextField
                                id="outlined-textarea"
                                name="phone"
                                type="number"
                                label="Phone Number"
                                multiline
                                required
                                variant="standard"
                                sx={{ m: 1, width: '35ch' }}
                            />
                            <TextField
                                id="standard-multiline-flexible"
                                name="email"
                                label="Email"
                                type="email"
                                multiline
                                required
                                sx={{ m: 1, width: '35ch' }}
                                variant="standard"
                            />
                            <input type="submit" className="btn btn-success mt-5 ml-3" placeholder='Apply'/>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div >
    )
}
