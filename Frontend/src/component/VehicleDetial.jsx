import React from 'react'
import { FaUser } from "react-icons/fa";
// Removed unused Link import
import { FaLocationDot } from "react-icons/fa6";
import { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import toast from 'react-hot-toast';


const VehicleDetial = ({ LookingVehicle, VehicleDetialsRef, img, destination, fare, source, selectedVehicle }) => {
    const [loading, setLoading] = useState(false);
    async function handleClick(e) {
        // e.preventDefault();
        console.log("vehicle selected");
        const data = {
            pickup: source,
            destination: destination,
            vehicleType: selectedVehicle ,
            fare
        };
        
        try {
            setLoading(true)
            const ride = await axios.post('http://localhost:3000/rides/create', data, {
                headers: { // Fixed typo in 'headers'
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

         toast.success("Looking For Captains");
        LookingVehicle.current.style.display = "flex";
        VehicleDetialsRef.current.style.display = "none";
        
    }
      catch (error) {
        toast.error(source)
        console.log("lol",source)
       
    }
    finally {
        setLoading(false);
    }
}
return (
    <>
        <div>
            <img src={img} alt="vehicle img" className='img' />
        </div>
        <div className='utility-flex ride'>
            <FaLocationDot className='imgloc' /><p>destination : { destination }</p>
        </div>
        <div className='utility-flex details'>
            <div>
                <h2>Go Flex  </h2><FaUser />4
                <pre>5:17pm .  3 mins away</pre>
            </div>
            <h2>${fare}</h2>
        </div>
        <div>
            <div onClick={handleClick} className="confirm">{!loading ? "Confirm Booking" : "Loading..."}</div>
        </div>
    </>
)
}

export default VehicleDetial;