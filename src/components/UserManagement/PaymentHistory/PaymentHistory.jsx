import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import useAuth from "../../Shared/useAuth";
import useAxiosSecure from "../../Shared/useAxiosSecure";

export default function PaymentHistory() {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  // console.log(payments);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="md:pt-28 pt-12">
      <Helmet>
        <title>Doctor's Insight | Payment History</title>
      </Helmet>
      <h1 className="text-center md:text-5xl text-3xl pt-12 pb-12 md:pt-0">
        Payment History
      </h1>

      <div className="md:ml-28 mb-80 md:mr-28">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-cyan-500 text-white font-thin">
              <tr>
                <th>No.</th>
                <th>Email</th>
                <th>Price</th>
                <th>Transaction Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments.map((payment, index) => (
                <tr key={payment._id} className="border-b-3 border-amber-900">
                  <th>{index + 1}</th>
                  <td>
                    <p>{payment.email}</p>
                  </td>
                  <td className="font-bold">
                    <p>${payment.price}</p>
                  </td>
                  <td>
                    <p>{payment.transactionId}</p>
                  </td>
                  <td>
                    <p>{payment.status}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
