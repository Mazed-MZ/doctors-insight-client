import { Chip, TextField } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function AppointmentHeader({ handleDateChange }) {
    return (
        <div className='bg-cover bg-[url("https://tediselmedical.com/wp-content/uploads/2023/07/tecnologia_ergonomia_quirofanos_pic01_20230804_tedisel_medical.jpg")]'>
            <div className='bg-gradient-to-b bg-slate-300 bg-opacity-75 md:pl-56 md:pr-56 md:pt-28 pt-24 md:p-8'>
                <h1 className='md:text-5xl pb-5 text-5xl text-center'>Make your appointment</h1>
                <div className='md:flex '>
                    <div className='md:w-75 md:pt-18 p-8 text-center md:text-left'>
                        <div className='pb-3'>
                            <Calendar className='rounded-xl p-5 text-xl' onChange={handleDateChange} value={new Date()} />
                        </div>
                        <div className='md:pl-8'>
                            <Chip label="Select your appointment date" color="primary" className="w-72 font-bold" />
                        </div>
                    </div>
                    <div className='md:flex-initial hidden md:block md:pt-18 p-8'>
                        <img className='rounded-xl w-66' src="https://insiderguides.com.au/wp-content/uploads/2022/09/doc.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
