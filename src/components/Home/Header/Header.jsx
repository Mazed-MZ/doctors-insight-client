export default function Header() {
    return (
        <div className='bg-cover bg-[url("https://tediselmedical.com/wp-content/uploads/2023/07/tecnologia_ergonomia_quirofanos_pic01_20230804_tedisel_medical.jpg")]'>
            <div className='md:flex bg-gradient-to-b bg-slate-300 bg-opacity-75 md:pl-56 md:pr-56 md:pt-20'>
                <div className='md:w-1/2 md:p-20 p-8 text-center md:text-left'>
                    <h1 className='md:text-5xl pb-5 text-5xl'>Your New Smile Starts Here</h1>
                    <p className='pb-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the</p>
                    <button className="btn btn-outline">Get Started</button>
                </div>
                <div className='md:flex-initial md:w-1/2 md:p-10 p-5'><img className='rounded-xl' src="https://online-learning-college.com/wp-content/uploads/2023/01/Qualifications-to-Become-a-Doctor--scaled.jpg" alt="" /></div>
            </div>
        </div>
    )
}
