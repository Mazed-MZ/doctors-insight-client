import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';

const chartSetting = {
    yAxis: [
        {
            label: 'Appointments (People)',
        },
    ],
    width: 800,
    height: 400,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};
const dataset = [
    {
        teethOrthodontics: 59,
        cosmeticDentistry: 57,
        teethCleaning: 86,
        cavityProtection: 21,
        padiatricDental: 35,
        oralSurgery: 35,
        month: 'Jan'
    },
    {
        teethOrthodontics: 50,
        cosmeticDentistry: 52,
        teethCleaning: 78,
        cavityProtection: 28,
        padiatricDental: 30,
        oralSurgery: 23,
        month: 'Fev'
    },
    {
        teethOrthodontics: 47,
        cosmeticDentistry: 53,
        teethCleaning: 106,
        cavityProtection: 41,
        padiatricDental: 55,
        oralSurgery: 29,
        month: 'Mar'
    },
    // {
    //     teethOrthodontics: 54,
    //     cosmeticDentistry: 56,
    //     teethCleaning: 92,
    //     cavityProtection: 73,
    //     padiatricDental: 95,
    //     oralSurgery: 70,
    //     month: 'Apr'
    // },
    // {
    //     teethOrthodontics: 57,
    //     cosmeticDentistry: 79,
    //     teethCleaning: 92,
    //     cavityProtection: 99,
    //     padiatricDental: 41,
    //     oralSurgery: 30,
    //     month: 'May'
    // },
    // {
    //     teethOrthodontics: 60,
    //     cosmeticDentistry: 63,
    //     teethCleaning: 103,
    //     cavityProtection: 110,
    //     padiatricDental: 55,
    //     oralSurgery: 75,
    //     month: 'June'
    // }
];

const data = [
    { id: 0, value: 50, label: 'Teeth Orthodontics' },
    { id: 1, value: 45, label: 'Cosmetic Dentistry' },
    { id: 2, value: 30, label: 'Teeth Cleaning' },
    { id: 3, value: 40, label: 'Cavity Protection' },
    { id: 4, value: 65, label: 'Pediatric Dental' },
    { id: 5, value: 75, label: 'Oral Surgery' }
];

const valueFormatter = (value) => `${value} people`;

export default function Profile() {

    const [allAppointments, setAllAppointments] = useState([]);

    const [alldata, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/appointment')
            .then(res => res.json())
            .then(data => setAllAppointments(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/myappointment')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])


    return (
        <div className="pt-12">
            <div>
                <div className="md:ml-80 md:mr-48 hidden md:block">
                    <BarChart
                        dataset={dataset}
                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[
                            { dataKey: 'teethOrthodontics', label: 'Teeth Orthodontics', valueFormatter },
                            { dataKey: 'cosmeticDentistry', label: 'Cosmetic Dentistry', valueFormatter },
                            { dataKey: 'teethCleaning', label: 'Teeth Cleaning', valueFormatter },
                            { dataKey: 'cavityProtection', label: 'Cavity Protection', valueFormatter },
                            { dataKey: 'padiatricDental', label: 'Pediatric Dental', valueFormatter },
                            { dataKey: 'oralSurgery', label: 'Oral Surgery', valueFormatter }
                        ]}
                        {...chartSetting}
                    />
                </div>
                <div className="md:hidden block p-8">
                    <PieChart
                        series={[
                            {
                                data,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        height={300}
                    />
                </div>

                {/* <div className="overflow-x-auto md:ml-80 md:mr-48">
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name of Disease</th>
                                <th>Name of Patient</th>
                                <th className="hidden md:block">Time</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allAppointments.map((allPatients, index) =>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{allPatients.name}</td>
                                        <td>{allPatients.patient}</td>
                                        <td className="hidden md:block">{allPatients.time}</td>
                                        <td>{allPatients.email}</td>
                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div> */}

                <div className='md:grid md:grid-cols-3 md:gap-3 bg-cover bg-[url("https://tediselmedical.com/wp-content/uploads/2023/07/tecnologia_ergonomia_quirofanos_pic01_20230804_tedisel_medical.jpg")]'>
                    <div className="card w-96">
                        <div className="card-body">
                            <div className="stats glass">
                                <div className="stat text-center">
                                    <div className="stat-title text-white">Total Surgeons</div>
                                    <div className="stat-value text-neutral">3245</div>
                                    <div className="stat-desc text-base-100">21 surgeons have already joined last mont</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96">
                        <div className="card-body">
                            <div className="stats glass">
                                <div className="stat text-center">
                                    <div className="stat-title text-white">Total Appointments (per months)</div>
                                    <div className="stat-value text-neutral">50,245</div>
                                    <div className="stat-desc text-base-100">17% more than last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96">
                        <div className="card-body">
                            <div className="stats glass">
                                <div className="stat text-center">
                                    <div className="stat-title text-white">Total Operations</div>
                                    <div className="stat-value text-neutral">1045</div>
                                    <div className="stat-desc text-base-100">10% more than last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
