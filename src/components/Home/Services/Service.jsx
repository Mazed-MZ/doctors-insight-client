
export default function Service() {
    return (
        <div className='md:pt-28 pt-12'>
            <h1 className='text-4xl text-center md:pb-12 border-cyan-500 border-y border-x-8 md:text-5xl md:pr-30 p-8 m-8'>Services We Provide</h1>
            <div className='md:grid md:grid-cols-3 md:pl-12 md:gap-20 grid gap-8 md:m-8 m-8'>
                <div className="card card-compact bg-base-100 shadow-xl w-96">
                    <figure><img className='md:h-96 md:w-96' src="https://img.freepik.com/free-vector/dentist-hand-with-human-teeth-model_1308-93404.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699488000&semt=ais" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Fluoride Treatment</h2>
                        <p>Lorem Ipsum typesetting indust Ipsum has been the is simply dummy printing and typesetting indust Ipsum has been the</p>
                        <div className="card-actions justify-start">
                            <button className="btn btn-success">Get Appointment</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img className='md:h-96' src="https://modernsmiles.com/wp-content/uploads/2020/12/Modern-Smiles-scaled.jpeg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Cavity Filling</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eligendi cum provident eveniet laborum culpa repudiandae harum sint in laudantium.</p>
                        <div className="card-actions justify-start">
                            <button className="btn btn-success">Get Appointment</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://img.freepik.com/premium-vector/teeth-row-with-caries-snowwhite-happy-cute-yellow-sad-ugly-tooth-before-after-whitening_168129-1487.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Teath Whitening</h2>
                        <p>Lorem Ipsum is simply dummy printing and adipisicing elit. Sunt eligendi cum provident eveniet laborum typesetting indust Ipsum has been the</p>
                        <div className="card-actions justify-start">
                            <button className="btn btn-success">Get Appointment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
