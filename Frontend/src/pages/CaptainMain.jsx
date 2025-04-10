import React, { useState, useEffect } from 'react';
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { SlCursor } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { MdSpeed } from "react-icons/md";
import { RxRotateCounterClockwise } from "react-icons/rx";
import RideDetails from '../component/RideDetails';
import CaptainAcceptingRide from '../component/CaptainAcceptingRide';
import { useCaptainContext } from '../context/captainContext';
import { useSocketContext } from '../context/SocketContext';
import StartingRide from '../component/StartingRide';
import LiveTracking from '../component/LiveTracking';


const CaptainMain = () => {
  const { sendMessage, receiveMessage } = useSocketContext();
  const { captain } = useCaptainContext();

  const [captainStatus, setCaptainStatus] = useState(false);
  const [rideDetails, setRideDetails] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [newRide, setNewRide] = useState(null);
  const [location, setLocation] = useState(null);
  const [startRide, setStartRide] = useState(false);

  // Join the socket room when the captain is available
  useEffect(() => {
    if (captain) {
      const data = {
        typeOfUser: "captain",
        userId: captain._id,
      };
      sendMessage("join", data);
    }
  }, [captain, sendMessage]);

  // Update captain's location when triggered by a user gesture
  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          const captainId = captain._id;
          sendMessage("update-captain-location", {
            captainId,
            location: { ltd: latitude, lng: longitude },
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Trigger location updates only when the captain goes online
  const handleClick = () => {
    setCaptainStatus(!captainStatus);
    // setRideDetails(!rideDetails);

    if (!captainStatus) {
      // Request location when the captain goes online
      updateLocation();
    }
  };

  // Listen for new ride events
  useEffect(() => {
    receiveMessage("new-ride", (ride) => {
      console.log("New ride received:", ride);
      setNewRide(ride);
    });
  }, [receiveMessage]);

  if (!captain) {
    return <p>Loading...</p>; // Handle case where captain data is not yet available
  }

  return (
    <div className="main-container">
      {/* Navigation Bar */}
      <div className="captain-nav">
        <div>
          <img className="logo" src="/images/uber-logo.png" alt="Uber Logo" />
        </div>
        <h2>{captainStatus ? "Online" : "Offline"}</h2>
        <div onClick={handleClick}>
          {(captainStatus ) ? (
            <BsToggle2On className="captain-mode-toggler" />
          ) : (
            <BsToggle2Off className="captain-mode-toggler" />
          )}
        </div>
      </div>

      {/* Offline Mode Message */}
      {!captainStatus && (
        <div className="utility-flex mode">
          <FaRegMoon className="captain-mode-toggler moon" />
          <div>
            <h2>You're Offline</h2>
            <p>Change the mode to receive bookings</p>
          </div>
        </div>
      )}

      {/* Map Section */}
      <div className="map-container">
        <div>
          <LiveTracking />
        </div>
        <SlCursor className="navigator" />
      </div>

      {/* Captain Details */}
      <div className="captain-details">
        <div className="utility-flex img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqb3ltH2zwdPZqPg3H_6v5uEb4kjPF2PXfgiUDiWJT3vu1XNhFp29qVyQZ5y70AtYR7K8&usqp=CAU"
            alt="Captain"
          />
          <div>
            <h3 className="font-moderate">
              {captain?.fullname.firstname + " " + captain?.fullname.lastname}
            </h3>
            <p>Expert driver</p>
          </div>
          <div>
            <h2>$517</h2>
            <p>Earned</p>
          </div>
        </div>
        <div className="captain-history">
          <div className="icon">
            <CiClock2 className="captain-mode-toggler" />
            <h2>4.9</h2>
            <p>Hours Spent</p>
          </div>
          <div className="icon">
            <MdSpeed className="captain-mode-toggler" />
            <h2>40</h2>
            <p>Avg Speed</p>
          </div>
          <div className="icon">
            <RxRotateCounterClockwise className="captain-mode-toggler" />
            <h2>17</h2>
            <p>Rides Completed</p>
          </div>
        </div>
      </div>

      {/* Ride Details */}
      {(captainStatus && newRide) && (
        <div className="ride-details">
          <RideDetails
            setridedetails={setRideDetails}
            ridedetails={rideDetails}
            confirmtion={confirmation}
            setconfirmtion={setConfirmation}
            newRide={newRide}
          />
        </div>
      )}

      {/* Ride Confirmation */}
      {confirmation && (
        <div className="ride-details hight-full">
          <CaptainAcceptingRide
            setridedetails={setRideDetails}
            ridedetails={rideDetails}
            confirmtion={confirmation}
            setconfirmtion={setConfirmation}
            newRide={newRide}
            setStartRide = {setStartRide}
          />
        </div>
      )}

{startRide && <div className="ride-details hight-full">
           
        <StartingRide setridedetails={setRideDetails} setconfirmtion={setConfirmation} setStartRide = {setStartRide} newRide={newRide} />
  </div>}

    </div>
  );
};

export default CaptainMain;