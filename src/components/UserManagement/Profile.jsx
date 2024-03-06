import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import useAuth from "../Shared/useAuth";
import { Box, Sheet } from "@mui/joy";
import useAxiosSecure from "../Shared/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAppointments from "../Shared/useAppointments";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [appointments] = useAppointments();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  //console.log(payments.length)

  const { refetch, data: reviews = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`/addreview/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="pt-12">
      <h1 className="text-center md:text-5xl text-5xl mt-12 mb-12 md:pt-0">
        User Profile
      </h1>
      <div className="md:ml-96 md:pl-56 mb-12">
        <Card
          data-resizable
          sx={{
            textAlign: "center",
            alignItems: "center",
            width: 500,
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
          <CardContent sx={{ maxWidth: "40ch" }}>
            <Box
              sx={{
                width: "100%",
                position: "relative",
                overflow: { xs: "auto", sm: "initial" },
              }}
            >
              <Card
                orientation="horizontal"
                sx={{
                  width: "100%",
                  flexWrap: "wrap",
                  [`& > *`]: {
                    "--stack-point": "500px",
                    minWidth:
                      "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                  },
                  // make the card resizable for demo
                  overflow: "auto",
                  resize: "horizontal",
                }}
              >
                <Sheet
                  sx={{
                    bgcolor: "background.level1",
                    borderRadius: "sm",
                    p: 1.5,
                    my: 1.5,
                    display: "flex",
                    gap: 2,
                    "& > div": { flex: 1 },
                  }}
                >
                  <div>
                    <Typography level="body-xs" fontWeight="lg">
                      Pending Appointment
                    </Typography>
                    <Typography fontWeight="lg">
                      {appointments.length}
                    </Typography>
                  </div>
                  <div>
                    <Typography level="body-xs" fontWeight="lg">
                      Payment Complete
                    </Typography>
                    <Typography fontWeight="lg">{payments.length}</Typography>
                  </div>
                  <div>
                    <Typography level="body-xs" fontWeight="lg">
                      Your overall Rating
                    </Typography>
                    <Typography fontWeight="lg">{reviews ? reviews.rating : 0}</Typography>
                  </div>
                </Sheet>
                <Box
                  sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}
                >
                  <Button variant="outlined" color="primary">
                    <Link to="/payment-history">Payment History</Link>
                  </Button>
                  <Button variant="outlined" color="primary">
                    <Link to="/myappointment">My Appointment</Link>
                  </Button>
                </Box>
              </Card>
            </Box>
          </CardContent>
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
                <Link to="/feedback">Give your Feedback</Link>
              </Button>
              <Button variant="solid" color="primary">
                Surgeons Consultency
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
