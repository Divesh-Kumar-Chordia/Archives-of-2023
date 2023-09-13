import React from 'react'
import banner from  '../assets/images/banner.jpg'
import logo from  '../assets/images/logo.jpg'
function Header() {
    return (
        <div className='flex'>
        <img src={logo} className='w-[180px] h-[150px]'/>
        <img src={banner} className='w-[800px] h-[150px]'/>
        <ul className='flex gap-5'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
        </ul>
        <button>Subscribe</button>
        </div>
    )
}

export default Header
