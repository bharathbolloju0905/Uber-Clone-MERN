import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'

const RideAccepted = () => {
  return (
    <>
    <h1>Ride Accepted</h1>
        <div className='utility-flex info'>
          <img src="/images/car.png" alt="vehicle img" />
          <div >
            <h2>Vasudeva Krishna</h2>
            <h3>TG 09 UC 0517</h3>
            <h4>Toyoto Fortunure </h4>
          </div>
        </div>
        <div className='utility-flex ride'>
        <FaLocationDot className='imgloc' /> <p> 3-5-17/5, 2nd Floor, Opp. SBI, VV Nagar, Kukatpally, Hyderabad, Telangana 500072</p>
        </div>
        <div className='utility-flex details'>
          <div>
            <h2>Go Flex  4</h2>
            <pre>5:17pm .  3 mins away</pre>
          </div>
          <h2>$517.045</h2>
        </div>
        <div>
          <button className="confirm">Cancel Booking Ride</button>
        </div>
    </>
  )
}

export default RideAccepted