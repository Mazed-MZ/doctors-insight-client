import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <footer className="footer p-10 bg-base-200 md:pr-56 md:pl-56 text-base-content">
      <aside>
        <Link><img className='w-36 md:w-52' src="https://i.ibb.co/DfsPcGz/doctors-insight.png" alt="doctors-insight" border="0" /></Link>
        <p>Doctors Insight Ltd.<br />Providing reliable medical service since 1992</p>
      </aside>
      <nav data-aos="fade-right"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500">
        <header className="footer-title">SERVICES</header>
        <a className="link link-hover">Emergency Checkup</a>
        <a className="link link-hover">Monthly Checkup</a>
        <a className="link link-hover">Weekly Checkup</a>
        <a className="link link-hover">Deep Checkup</a>
      </nav>
      <nav>
        <header className="footer-title">ORAL HEALTH</header>
        <a className="link link-hover">Flouride Treatment</a>
        <a className="link link-hover">Cavity Filling</a>
        <a className="link link-hover">Teath Whitening</a>
        <a className="link link-hover">Teath Washing</a>
      </nav>
      <nav data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500">
        <header className="footer-title">COMPANY</header>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Contact Us</a>
        <a className="link link-hover">Jobs</a>
      </nav>
      <nav data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500">
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms & Conditions</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  )
}
