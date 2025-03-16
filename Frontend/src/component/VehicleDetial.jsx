import React from 'react'
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";



const VehicleDetial = ({LookingVehicle,VehicleDetials}) => {
    function handleClick(){
        console.log("vehicle selected")
        LookingVehicle.current.style.display = "flex";
        VehicleDetials.current.style.display = "none";
      }
    return (
        <>
            <div>
                <img src="/images/car.png" alt="vehicle img" />
            </div>
            <div className='utility-flex ride'>
            <FaLocationDot className='imgloc'/><p> 3-5-17/5, 2nd Floor, Opp. SBI, VV Nagar, Kukatpally, Hyderabad, Telangana 500072</p>
            </div>
            <div className='utility-flex details'>
                <div>
                    <h2>Go Flex  </h2><FaUser/>4
                    <pre>5:17pm .  3 mins away</pre>
                </div>
                <h2>$517.045</h2>
            </div>
            <div>
                <div onClick={handleClick} className="confirm">Confirm Booking</div>
            </div>
        </>
    )
}

export default VehicleDetial