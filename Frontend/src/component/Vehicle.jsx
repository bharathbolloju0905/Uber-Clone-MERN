import React from 'react'
import { FaUser } from "react-icons/fa";



const Vehicle = ({img,mins,price,capacity,selectedveh,VehicleRef}) => {
  function handleVehicleSelected(){
    console.log("vehicle selected")
    selectedveh.current.style.display = "flex";
    VehicleRef.current.style.display = "none";
  }
  return (
    <div className="vehicle" onClick={handleVehicleSelected}>
        <img src={img} alt="hello" />
        <div >
           <p className='v-para'> Affordable and Conforable <span><FaUser/>{capacity}</span></p> 
       <span> <p>{mins} min away. reach you soon</p></span>
        </div>
        <div>
            <p style={{fontSize:25, fontWeight:'bold'}}>${price}</p>
        </div>
    </div>
  )
}

export default Vehicle