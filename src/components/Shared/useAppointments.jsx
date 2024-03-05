import { useContext } from "react";
import { UserContext } from "../providers/AuthProviders";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";


const useAppointments = () => {
    const { user, loading } = useContext(UserContext);
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: appointments = [] } = useQuery({
        queryKey: ['appointments', user?.email],
        enabled: !loading,

        //====>>> Just for Token <<<====
        // queryFn: async () => {
        //     const response = await fetch(`https://bistro-boss-restaurant-server.onrender.com/carts?email=${user?.email}`, {headers: {
        //         authorization: `bearer ${token}`
        //     }})
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok')
        //     }
        //     return response.json()
        // },

        //====>>>> With AxiosSecure <<<<====
        queryFn: async () => {
            const res = await axiosSecure.get(`/appointments/${user?.email}`)
            // console.log('res from axios', res)
            return res.data;
        },
    })
    return[appointments, refetch]
}
export default useAppointments;