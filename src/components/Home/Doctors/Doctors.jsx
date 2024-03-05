
export default function Doctors({ docInfo }) {
    const { image, name, email, speciality } = docInfo;
    // console.log(docInfo)
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    {/* ---->>> for file upload <<<----
                     <img src={`http://localhost:5000/${doctors.path}`} alt="Shoes" className="rounded-xl" /> */}
                    <img src={image} alt="" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p className="italic">{speciality}</p>
                    <p>{email}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary">Contact Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
