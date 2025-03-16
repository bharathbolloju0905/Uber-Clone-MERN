import React, { useState } from 'react'
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { SlCursor } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { MdSpeed } from "react-icons/md";
import { RxRotateCounterClockwise } from "react-icons/rx";
import RideDetails from '../component/RideDetails';
import CaptainAcceptingRide from '../component/CaptainAcceptingRide';
const CaptainMain = () => {
  const [captainStatus, setcaptainStatus] = useState(false)
  const [ridedetails, setridedetails] = useState(false)
  const [confirmtion, setconfirmtion] = useState(false)
function handleClick(){
    setcaptainStatus(!captainStatus)
    setridedetails(!ridedetails)
}
  return (
    <div className='main-container'>
      <div className='captain-nav'>
        <div >
          <img className="logo" src="/images/uber-logo.png" alt="map" />
        </div>
        <h2>{captainStatus ? "Online" : "Offline"}</h2>
        <div onClick={handleClick}>
          {captainStatus ? <BsToggle2On className='captain-mode-toggler' /> : <BsToggle2Off className='captain-mode-toggler' />}
        </div>
      </div>
      {!captainStatus && <div className='utility-flex mode'>
        <FaRegMoon className='captain-mode-toggler moon' />
        <div>
          <h2>You're Offline</h2>
          <p>Change  the mode to receive the Bookings</p>
        </div>
      </div>}
      <div className='map-container'>
        <div>
        <img className='img' src="./images/map.png" alt="map" /></div>
        <SlCursor className='navigator' />
      </div>
      <div className='captain-details'>
        <div className="utility-flex img" >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqb3ltH2zwdPZqPg3H_6v5uEb4kjPF2PXfgiUDiWJT3vu1XNhFp29qVyQZ5y70AtYR7K8&usqp=CAU" alt="captain-img" />
          <div>
            <h3 className='font-moderate'>Captain Jack The Sparrow</h3>
            <p>Expert driver</p>
          </div>
          <div>
            <h2>$517</h2>
            <p>Earned</p>
          </div>
        </div>
        <div className='captain-history'>
            <div className='icon'>
              <CiClock2 className='captain-mode-toggler' />
              <h2>4.9</h2>
              <p>Hours Spent</p>
            </div>
            <div className='icon'>
              <MdSpeed className='captain-mode-toggler' />
              <h2>40</h2>
              <p>Avg Speed</p>
            </div>
            <div className='icon'>
              <RxRotateCounterClockwise className='captain-mode-toggler' />
              <h2>17</h2>
              <p>Rides Completed</p>
            </div>
        </div>

      </div>
      {ridedetails && (
        <div className='ride-details '>
          <RideDetails setridedetails={setridedetails} ridedetails={ridedetails}  confirmtion={confirmtion} setconfirmtion={setconfirmtion} />
        </div>
      )}
         {confirmtion && 
         (<div className='ride-details hight-full'>
         <CaptainAcceptingRide setridedetails={setridedetails} ridedetails={ridedetails}  confirmtion={confirmtion} setconfirmtion={setconfirmtion}/>
   </div>)}

    </div>
  )
}

export default CaptainMain;