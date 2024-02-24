import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const allUser = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
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
            const res = await axiosSecure.get(`/user`)
            // console.log('res from axios', res)
            return res.data;
        },
    })
    return [users, refetch]
}
export default allUser;