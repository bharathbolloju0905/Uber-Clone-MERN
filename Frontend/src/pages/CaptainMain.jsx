import React, { useState, useEffect } from 'react'
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { SlCursor } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { MdSpeed } from "react-icons/md";
import { RxRotateCounterClockwise } from "react-icons/rx";
import RideDetails from '../component/RideDetails';
import CaptainAcceptingRide from '../component/CaptainAcceptingRide';
import { useCaptainContext } from '../context/captainContext';
import { useSocketContext } from '../context/SocketContext';

const CaptainMain = () => {
  const { sendMessage,receiveMessage } = useSocketContext();
  const { captain } = useCaptainContext();

  const [captainStatus, setCaptainStatus] = useState(false);
  const [rideDetails, setRideDetails] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [newride, setnewride] = useState(null);

  useEffect(() => {
    if (captain) {
      const data = {
        typeOfUser: "captain",
        userId: captain._id,
      };
      sendMessage("join", data);
    }
  }, [captain, sendMessage]);

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const captainId = captain._id;
          sendMessage("update-captain-location", { captainId ,location:{ltd: latitude, lng: longitude} });
        });
      }
    };

    const intervalId = setInterval(updateLocation, 10000); // Call every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [sendMessage]);
  

  useEffect(() => {
  receiveMessage("new-ride", (ride) => {
    console.log("ride",ride)
    setnewride(ride);

  })
  }, [receiveMessage,captain]);

  const handleClick = () => {
    setCaptainStatus(!captainStatus);
    setRideDetails(!rideDetails);
  };

  if (!captain) {
    return <p>Loading...</p>; // Handle case where captain data is not yet available
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
            <h3 className='font-moderate'>{ captain?.fullname.firstname + " " + captain?.fullname.lastname}</h3>
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
      {rideDetails && (
        <div className='ride-details '>
          <RideDetails setridedetails={setRideDetails} ridedetails={rideDetails}  confirmtion={confirmation} setconfirmtion={setConfirmation} newRide = {newride} />
        </div>
      )}
         {confirmation && 
         (<div className='ride-details hight-full'>
         <CaptainAcceptingRide setridedetails={setRideDetails} ridedetails={rideDetails}  confirmtion={confirmation} setconfirmtion={setConfirmation} newRide = {newride}/>
   </div>)}

    </div>
  )
}

export default CaptainMain;