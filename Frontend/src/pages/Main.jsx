import React, { useEffect, useRef, useState } from 'react'
import SuggestionLoc from '../component/SuggestionLoc';
import Vehicle from '../component/Vehicle';
import { IoIosArrowDown } from "react-icons/io";
import VehicleDetial from '../component/VehicleDetial';
import LookingForVehicle from '../component/LookingForVehicle';
import RideAccepted from '../component/RideAccepted';
const Main = () => {
  const inputContainer = useRef(null);
  const suggestions = useRef(null);
  const [togglePannel, settogglePannel] = useState(false);
  const VehicleRef = useRef(null);
  const [vehiclepanel, setvehiclepanel] = useState(false)
  const VehicleDetials = useRef(null);
  const LookingVehicle = useRef(null)

  useEffect(() => {
    if (togglePannel) {
      inputContainer.current.style.height = "95vh";
      inputContainer.current.style.top = "0px";
      suggestions.current.style.display = "flex"
    }
    else {
      inputContainer.current.style.bottom = "3rem";
      suggestions.current.style.display = "none",
        inputContainer.current.style.height = "fit-content";
      inputContainer.current.style.top = "unset";


    }
  }, [togglePannel])

  useEffect(() => {
    if (vehiclepanel) {
      VehicleRef.current.style.display = "none";
      setvehiclepanel(false)
    }
  }, [vehiclepanel])


  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className='main-container'>
      <div className='uber-logo'>
        <img className='logo' src="/images/uber-logo.png" alt="uber-logo" />
      </div>
      <div className='map-container'>
  <div>
        <img className='img' src="./images/map.png" alt="map" /></div>
      </div>
      <div ref={inputContainer} className='input-container'>
        <h1>Find a Ride</h1>
        {togglePannel && <IoIosArrowDown className='toggle' onClick={() => settogglePannel(false)} />}
        <form onSubmit={handleSubmit}>
          <div className='horizontal'></div>
          <input onClick={() => settogglePannel(true)} type="text" placeholder='Enter your Source point' />
          <input onClick={() => settogglePannel(true)} type="text" placeholder='Enter the Destination point' />
        </form>
        <div ref={suggestions} className='suggestions'>
          <SuggestionLoc settogglePannel={settogglePannel} togglePannel={togglePannel} VehicleRef={VehicleRef} />
          <SuggestionLoc settogglePannel={settogglePannel} togglePannel={togglePannel} VehicleRef={VehicleRef} />
          <SuggestionLoc settogglePannel={settogglePannel} togglePannel={togglePannel} VehicleRef={VehicleRef} />
        </div>

      </div>
      <div className="choosing-vehicle" ref={VehicleRef}>
        <IoIosArrowDown className='toggler' onClick={() => setvehiclepanel(true)} />
        <Vehicle img={"/images/car.png"} mins={"2 mins away"} price={517.045} capacity={4} selectedveh={VehicleDetials} VehicleRef={VehicleRef} />
        <Vehicle img={"/images/auto.png"} mins={"5 mins away"} price={401.05} capacity={2} selectedveh={VehicleDetials} VehicleRef={VehicleRef} />
        <Vehicle img={"/images/bike.png"} mins={"3 mins away"} price={320.56} capacity={1} selectedveh={VehicleDetials} VehicleRef={VehicleRef} />
      </div>

      <div className="vehicle-details" ref={VehicleDetials}>
        <VehicleDetial LookingVehicle={LookingVehicle} VehicleDetials={VehicleDetials} />
      </div>
      <div className="vehicle-details looking-for-vehicle" ref={LookingVehicle}>
        <LookingForVehicle />
      </div>

      <div className='vehicle-details ride-accepted'>
          <RideAccepted/>
      </div>
    </div>
  )
}

export default Main;