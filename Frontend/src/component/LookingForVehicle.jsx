import React from 'react'
import { FaLocationDot,FaUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
const LookingForVehicle = ({fare, img,LookingVehicle,handleCancel,setvehiclepanel}) => {
    function handleCancel(){
        console.log("vehicleDetialsref")
        LookingVehicle.current.style.display = "none"
        setvehiclepanel(false)
    }
    return (
        <>
        <h1>Looking for a ride</h1>
            <div>
                <img src={img} alt="vehicle img" />
            </div>
            {/* <div className='utility-flex ride'>
                <FaLocationDot className='imgloc' /><p> 3-5-17/5, 2nd Floor, Opp. SBI, VV Nagar, Kukatpally, Hyderabad, Telangana 500072</p>
            </div> */}
            <div className='utility-flex details'>
                <div>
                    <h2>Go Flex  </h2><FaUser />4
                    <pre>5:17pm .  3 mins away</pre>
                </div>
                <h2>${fare}</h2>
            </div>
            <div >
                <button className="confirm" onClick={handleCancel}>Cancel Booking Ride</button>
            </div>
        </>
    )
}

export default LookingForVehicle