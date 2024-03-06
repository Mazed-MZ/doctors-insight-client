import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { Box, Sheet } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Shared/useAxiosSecure";
import useAppointments from "../../Shared/useAppointments";
import useAuth from "../../Shared/useAuth";
import { Input, Rating, Stack } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Feedback() {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [value, setValue] = useState(2);

  const { refetch, data: reviews = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`/addreview/${user?.email}`);
      return res.data;
    },
  });

  const handleReview = (event) => {
    event.preventDefault();
    const form = event.target;
    const rating = form.rating.value;
    const country = form.country.value;
    const review = form.review.value;
    const reviewData = {
      rating,
      country,
      review,
      userName: user.displayName,
      userPhoto: user.photoURL,
      userEmail: user.email,
    };
    // console.log(reviewData);
    Swal.fire({
      title: "Are you confirm to add this review?",
      text: "Your review will be shown in our website",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/addreview", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(reviewData),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data.insertedId)
            if (data.insertedId) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Thanks to give your valuable review",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div className="pt-12">
      <h1 className="text-center md:text-5xl text-5xl mt-12 mb-12 md:pt-0">
        Write Your Feedback
      </h1>

      {reviews ? (
        <div className="md:ml-96 md:pl-72 mb-12">
          <Card
            data-resizable
            sx={{
              textAlign: "center",
              alignItems: "center",
              width: 410,
              // to make the demo resizable
              overflow: "auto",
              resize: "horizontal",
              "--icon-size": "100px",
            }}
          >
            <CardOverflow variant="solid" color="primary">
              <AspectRatio
                variant="outlined"
                color="warning"
                ratio="1"
                sx={{
                  m: "auto",
                  transform: "translateY(50%)",
                  borderRadius: "50%",
                  width: "var(--icon-size)",
                  boxShadow: "sm",
                  bgcolor: "background.surface",
                  position: "relative",
                }}
              >
                <div>
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={reviews?.userPhoto} />
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </CardOverflow>
            <Typography
              level="title-lg"
              sx={{ mt: "calc(var(--icon-size) / 2)" }}
            >
              {reviews?.userName}
            </Typography>
            <p className="text-xm font-semibold italic text-gray-500">
              {reviews?.userEmail}
            </p>
            <form onSubmit={handleReview}>
              <div className="w-96">
                <Rating name="read-only" value={reviews.rating} readOnly />
              </div>
              <div className="form-control pt-5">
                <span className="label-text text-start text-lg">Your country/city name:</span>
                <Input disabled defaultValue={reviews?.country} />
              </div>
              <div className="form-control pt-8">
                <span className="label-text text-start text-lg">Your Feedback:</span>
                <Input disabled defaultValue={reviews?.review} />
              </div>
            </form>
            <CardActions
              orientation="vertical"
              buttonFlex={1}
              sx={{
                "--Button-radius": "10px",
                width: "clamp(min(100%, 400px), 50%, min(100%, 500px))",
              }}
            >
              <div className="grid grid-cols-2 gap-2">
                <Button variant="solid" color="primary">
                  <Link to="/appointment">Make New Appointment</Link>
                </Button>
                <Button variant="solid" color="primary">
                  Surgeons Consultency
                </Button>
              </div>
            </CardActions>
          </Card>
        </div>
      ) : (
        <div className="md:ml-96 md:pl-72 mb-12">
          <Card
            data-resizable
            sx={{
              textAlign: "center",
              alignItems: "center",
              width: 410,
              // to make the demo resizable
              overflow: "auto",
              resize: "horizontal",
              "--icon-size": "100px",
            }}
          >
            <CardOverflow variant="solid" color="primary">
              <AspectRatio
                variant="outlined"
                color="warning"
                ratio="1"
                sx={{
                  m: "auto",
                  transform: "translateY(50%)",
                  borderRadius: "50%",
                  width: "var(--icon-size)",
                  boxShadow: "sm",
                  bgcolor: "background.surface",
                  position: "relative",
                }}
              >
                <div>
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </CardOverflow>
            <Typography
              level="title-lg"
              sx={{ mt: "calc(var(--icon-size) / 2)" }}
            >
              {user?.displayName}
            </Typography>
            <p className="text-xm font-semibold italic text-gray-500">
              {user?.email}
            </p>
            <form onSubmit={handleReview}>
              <div className="w-96">
                <Rating
                  name="rating"
                  value={value}
                  size="large"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
              <div className="form-control pt-2">
                <textarea
                  type="text"
                  name="country"
                  className="textarea textarea-warning textarea-xs"
                  placeholder="Write your Country or City name"
                ></textarea>
              </div>
              <div className="form-control pt-2">
                <textarea
                  type="text"
                  name="review"
                  className="textarea textarea-warning"
                  placeholder="Give your honest feedback about Doctor's Insight"
                ></textarea>
              </div>
              <div className="form-control mt-3">
                <button className="btn btn-success">Submit</button>
              </div>
            </form>
            <CardActions
              orientation="vertical"
              buttonFlex={1}
              sx={{
                "--Button-radius": "10px",
                width: "clamp(min(100%, 400px), 50%, min(100%, 500px))",
              }}
            >
              <div className="grid grid-cols-2 gap-2">
                <Button variant="solid" color="primary">
                  <Link to="/appointment">Make New Appointment</Link>
                </Button>
                <Button variant="solid" color="primary">
                  Surgeons Consultency
                </Button>
              </div>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
}
