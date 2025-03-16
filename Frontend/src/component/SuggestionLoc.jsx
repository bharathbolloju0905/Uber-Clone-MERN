import React from 'react'
import { FaLocationDot } from "react-icons/fa6";



const SuggestionLoc = ({settogglePannel , togglePannel,VehicleRef}) => {
  function handleClick(){
    togglePannel && settogglePannel(false);
    VehicleRef.current.style.height = '60vh';
    VehicleRef.current.style.display = 'flex';
  }
  return (
    <div className='suggest' onClick={handleClick}>
        <FaLocationDot className='imgloc' />
        <div>
            <p><b>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, nulla.</b></p>
            <p className='para'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
    </div>
  )
}

export default SuggestionLoc