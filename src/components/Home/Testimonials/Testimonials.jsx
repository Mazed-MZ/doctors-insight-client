import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import useAxiosSecure from "../../Shared/useAxiosSecure";
import useAdmin from "../../Shared/useAdmin";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "@mui/material";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Testimonials() {
  const [axiosSecure] = useAxiosSecure();
  const [isAdmin] = useAdmin();

  const { refetch, data: reviews = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get("/addreview");
      return res.data;
    },
  });
  // console.log(reviews);

  const handleDeleteReview = (reviewInfo) => {
    console.log(reviewInfo);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `http://localhost:5000/addreview/${reviewInfo._id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Review Deleted!",
                icon: "success",
              });
            }
          });
      }
    });
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="md:pt-28 pt-12">
      <h1 className="text-4xl text-center md:pb-12 border-cyan-500 border-y border-x-8 md:text-5xl md:pr-30 m-8 p-8">
        What Our Patients Says
      </h1>
      <div className="md:grid md:grid-cols-3 md:gap-50 md:pl-20 md:pb-20 grid grid-row-2 gap-8 md:m-8 m-8">
        {reviews?.map((reviewInfo) => (
          <div
            data-aos="flip-up"
            className="w-96 bg-base-100 shadow-xl"
            key={reviewInfo.id}
          >
            <div className="card-body">
              <div className="grid">
                <div className="stat-figure text-secondary">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img
                        className="border-cyan-500 border-4 rounded-full"
                        src={reviewInfo.userPhoto}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-3xl">{reviewInfo.userName}</div>
                <div className="stat-title">{reviewInfo.country}</div>
                <Rating
                  name="read-only"
                  className="mt-3"
                  value={reviewInfo.rating}
                  readOnly
                />
              </div>
              <p>{reviewInfo.review}</p>
            </div>
            {isAdmin ? (
              <button
                onClick={() => handleDeleteReview(reviewInfo)}
                className="btn btn-error btn-outline w-72 ml-12 mb-5"
              >
                Delete Review
                <FontAwesomeIcon icon={faTrash} style={{ color: "#FFD43B" }} />
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
