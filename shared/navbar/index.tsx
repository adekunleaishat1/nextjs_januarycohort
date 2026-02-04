import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-[#fff] py-5 px-6'>
      <div className=''>
        <h2  className='text-2xl text-[#000] font-medium leading-2 tracking-wide'>SQI Class</h2>
      </div>
      <div className='hidden sm:flex justify-between gap-6 items-center  '>
        <p className='text-[16px] text-[#000]  font-medium'>Home</p>
        <p className='text-[16px] text-[#000]  font-medium'>About Us</p>
        <p className='text-[16px] text-[#000]  font-medium'>Faqs</p>
      </div>
       <div>
          
       </div> 
       <button className='px-[20px] py-2 border border-b-blue-50 rounded-[10px] text-[#000] hidden md:block'>Sign up</button>
    </div>
  )
}

export default Navbar