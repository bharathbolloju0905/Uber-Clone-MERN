import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import axios from "axios"

const RideAccepted = ({rideAccepted}) => {
    //   (async()=>{
    //     const rideId = rideAccepted._id ;
    // const res =  await axios.get(`http://localhost:3000/rides/getdetails/${rideId}`,{
    //   headers:{
    //     Authorization:`Bearer ${localStorage.getItem('token')}`
    //   }
    // });
    // console.log(res.data)
    //   })();

  return (
    <>
    <h1>Ride Accepted</h1>
        <div className='utility-flex info'>
          <img src={`/images/${rideAccepted?.vehicleType}.png`} alt="vehicle img" />
          <div >
            <h2>{rideAccepted?.captainId.fullname.firstname +" "+ rideAccepted?.captainId.fullname.lastname}</h2>
            <h3>{rideAccepted?.captainId.vehicle.plate}</h3>
            <h4>{rideAccepted?.vehicleType}</h4>
          <h2>{rideAccepted?.otp}</h2>


          </div>
        </div>
        <div className='utility-flex ride'>
        <FaLocationDot className='imgloc' /> <p> {rideAccepted?.pickup}</p>
        </div>
        <div className='utility-flex details'>
          <div>
            <h2>Go Flex  {rideAccepted?.captainId.vehicle.capacity}</h2>
            <pre>5:17pm .  3 mins away</pre>
          </div>
          <h2>${rideAccepted?.fare}</h2>
        </div>
        <div>
          <button className="confirm">Cancel Booking Ride</button>
        </div>
    </>
  )
}

export default RideAccepted