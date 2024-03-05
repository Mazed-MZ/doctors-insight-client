import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useLoaderData } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

export default function Payment() {
  const appointments = useLoaderData();
  console.log(appointments);

  const stripePromise = loadStripe(
    "pk_test_51Ofzj6HltYrJSEDhsB0l1hbhLGjmV6OiSz68aHIFRpRXd0RRELkx293WgtWpvJUHh3BJcCtQak2wRUxrD6BPTb5d00A3PPZdkr"
  );

  //   const currencies = [
  //     {
  //       value: "USD",
  //       label: "$ USD",
  //     },
  //     {
  //       value: "EUR",
  //       label: "€ EURO",
  //     },
  //     {
  //       value: "BTC",
  //       label: "฿ BITCOIN",
  //     },
  //     {
  //       value: "JPY",
  //       label: "¥ YEN",
  //     },
  //     {
  //       value: "BDT",
  //       label: "৳ TAKA",
  //     },
  //     {
  //       value: "INR",
  //       label: "₹ RUPEE",
  //     },
  //   ];

  //   const handleSubmit = (event) => {
  //     // console.log('clicked')
  //     event.preventDefault();
  //     const form = event.target;
  //     const patient = form.patient.value;
  //     const currency = form.currency.value;
  //     const phone = form.phone.value;
  //     const patientId = form._id.value;
  //     const name = form.name.value;

  //     const paymentInfo = { patient, currency, phone, patientId, name };
  //     console.log(paymentInfo);

  //     fetch("http://localhost:5000/proceed-payment", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(paymentInfo),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         // window.location.replace(result.url);
  //         console.log(result);
  //       });
  //   };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="md:pt-28 pt-12">
      <Helmet>
        <title>Doctors Insight | Payment</title>
      </Helmet>
      <div>
        <div className="pt-18">
          <div>
            <h1 className="text-4xl text-center border-cyan-500 border-y border-x-8 md:text-5xl md:pr-30 md:pb-5 m-8 p-8">
              Make Payment
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white m-12">
        <Elements stripe={stripePromise}>
          <CheckOutForm></CheckOutForm>
        </Elements>
      </div>

      {/* <div className='md:grid md:grid-cols-2 md:gap-12 md:m-12'>
                <div>
                    <Card size="lg" variant="outlined" className="shadow-xl">
                        <Typography level="h2">{appointments.name}</Typography>
                        <Divider inset="none" />
                        <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                            <ListItem>
                                <ListItemDecorator>
                                    <FontAwesomeIcon icon={faCheck} size="xl" />
                                </ListItemDecorator>
                                Appointment Time: {appointments.time}
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                    <FontAwesomeIcon icon={faCheck} size="xl" />
                                </ListItemDecorator>
                                Serial No: {appointments.space}
                            </ListItem>
                            <ListItem>
                                <ListItemDecorator>
                                    <FontAwesomeIcon icon={faCheck} size="xl" />
                                </ListItemDecorator>
                                Patient Phone No:
                                {appointments.phone}
                            </ListItem>
                        </List>
                        <Divider inset="none" />
                    </Card>
                </div>
                <div>
                    <Card
                        variant="outlined"
                        sx={{
                            maxHeight: 'max-content',
                            maxWidth: '100%',
                            mx: 'auto',
                            // to make the demo resizable
                            overflow: 'auto',
                            resize: 'horizontal',
                        }}
                        className="shadow-xl"
                    >
                        <Typography level="title-lg" startDecorator={<FontAwesomeIcon icon={faCreditCard} size="xl" />}>
                            Billing Details
                        </Typography>
                        <Divider inset="none" />
                        <Chip size="sm" variant="outlined" color="neutral">
                            Appointment Time: {appointments.time}
                        </Chip>
                        <CardContent
                        >
                            <form className='grid grid-cols-2 gap-3' onSubmit={handleSubmit}>
                                <TextField
                                    required
                                    id="filled-textarea"
                                    label="Name"
                                    name="patient"
                                    defaultValue={appointments.patient}
                                    variant="filled"
                                    sx={{ gridColumn: '1/-1' }}
                                />
                                <TextField
                                    required
                                    id="filled-select-currency"
                                    select
                                    name="currency"
                                    label="Please select your currency"
                                    defaultValue="EUR"
                                    variant="filled"
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Phone No"
                                    name="phone"
                                    defaultValue={appointments.phone}
                                    variant="filled"
                                />
                                <CardActions>
                                    <TextField
                                        disabled
                                        id="standard-disabled"
                                        name="_id"
                                        label="Patient ID"
                                        defaultValue={appointments._id}
                                        variant="standard"
                                    />
                                    <TextField
                                        disabled
                                        id="standard-disabled"
                                        name="name"
                                        label="Service name"
                                        defaultValue={appointments.name}
                                        variant="standard"
                                    />
                                </CardActions><input className='btn btn-square btn-secondary text-white w-full' type="submit" value="Proceed to payment" color="primary" />
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div> */}
    </div>
  );
}
