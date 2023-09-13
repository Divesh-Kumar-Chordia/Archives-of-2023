import React from 'react'
import "./Navbar.css"
function Navbar() {
    return (
        <div className="navbar">

                {/* <img src='' width={50} height={50} /> */}
                <div className='button-section'>
                    <div className='cell'>Home</div>
                    <div className='cell'>Achievements</div>
                    <div className='cell'>HeatMap</div>
                    <div className='cell'>Graphs</div>
                    <div className='cell'>Contacts</div>
                    <div className='cell'>@enigma</div>
                </div>
        </div>
    )
}

export default Navbar
