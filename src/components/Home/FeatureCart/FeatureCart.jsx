import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function FeatureCart() {

    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    return (
        <div>
            <div className='md:grid md:grid-cols-3 md:gap-50 md:pl-38 md:pt-20 grid grid-row-2 gap-8 md:m-8 pl-20 m-8 text-center'>
                <div data-aos="flip-down" className="w-3/4 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <FontAwesomeIcon icon={faClock} spin spinReverse size="2xl" />
                        <h1 className='text-lg font-bold'>Opening Hours</h1>
                        <p>Lorem Ipsum is simply dummy text of the pri</p>
                    </div>
                </div>


                <div data-aos="flip-down" className="w-3/4 bg-base-100 shadow-xl image-full">
                    <div className="card-body">
                    <FontAwesomeIcon icon={faLocationDot} flip size="2xl" />
                        <h2 className="text-lg font-bold">Visit Our Location</h2>
                        <p>Brooklyn, NY 10036, United States</p>
                    </div>
                </div>

                <div data-aos="flip-down" className="w-3/4 bg-base-100 shadow-xl image-full">
                    <div className="card-body">
                    <FontAwesomeIcon icon={faPhoneVolume} fade size="2xl" />
                        <h2 className="text-lg font-bold">Contact Us Now</h2>
                        <p>+000 123 456789</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
