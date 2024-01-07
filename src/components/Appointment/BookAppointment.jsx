
export default function BookAppointment({date}) {
  return (
    <div className='md:pl-56 md:pr-56 md:pt-20'>
      <h1 className='md:text-5xl pb-5 text-5xl text-center'>Available Appointment on {date.toDateString()}</h1>
    </div>
  )
}
