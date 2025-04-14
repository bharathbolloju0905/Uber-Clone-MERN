import React, { useEffect, useRef, useState } from 'react'
import SuggestionLoc from '../component/SuggestionLoc';
import Vehicle from '../component/Vehicle';
import { IoIosArrowDown } from "react-icons/io";
import VehicleDetial from '../component/VehicleDetial';
import LookingForVehicle from '../component/LookingForVehicle';
import RideAccepted from '../component/RideAccepted';
import axios from 'axios';
import { useSocketContext } from '../context/SocketContext';
import { useUserContext } from '../context/userContext';
import LiveTracking from '../component/LiveTracking';
const Main = () => {
  const inputContainer = useRef(null);
  const suggestions = useRef(null);
  const [togglePannel, settogglePannel] = useState(false);
  const VehicleRef = useRef(null);
  const [vehiclepanel, setvehiclepanel] = useState(false)
  const VehicleDetials = useRef(null);
  const LookingVehicle = useRef(null)
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const { socket, receiveMessage, sendMessage } = useSocketContext()
  const [rideAccepted, setrideAccepted] = useState(null);
  const { user } = useUserContext()
  const [fare, setFare] = useState({
    car: 0,
    auto: 0,
    bike: 0
  });

  const [selectedVehicle, setSelectedVehicle] = useState(null);

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
  }, [togglePannel]);

  useEffect(() => {
    if (user) {
      console.log("user is joined")
      const data = {
        typeOfUser: "user",
        userId: user?._id
      }
      sendMessage('join', data)
    }
  }, [user, sendMessage])

  console.log(rideAccepted &&"hii")
  const handleInputChange = async (e, setInput) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 2) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/maps/get-suggestions?input=${value}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }
        );

        setSuggestionsList(response.data);
      } catch (error) {
        console.log("error in fetching suggestions")
        // console.error(error);

      }
    } else {
      setSuggestionsList([]);
    }
  };
     
    function  handleCancel(){
      setrideAccepted(null);
      setSource("");
      setDestination("");
      setSuggestionsList([]);
      setvehiclepanel(false);
      setSelectedVehicle(null);
      inputContainer.current.style.height = "fit-content";
      inputContainer.current.style.top = "unset";
      inputContainer.current.style.bottom = "3rem";
      suggestions.current.style.display = "none";

      }
  useEffect(() => {
    const audio = new Audio("/notification.mp3"); // Load the sound file from the public folder

    receiveMessage("ride-accepted", (data) => {
      console.log("Ride accepted:", data);
      setrideAccepted(data);

      // Play the notification sound
      audio.play();

      // Hide the VehicleDetials ref when the ride is accepted
      if (VehicleDetials.current) {
        VehicleDetials.current.style.display = "none";
      }
      LookingVehicle.current.style.display = "none";
    });

    receiveMessage("ride-completed", (data) => {
      console.log("Ride completed:", data);
      handleCancel()

      // Play the notification sound
      audio.play();

      // Hide the VehicleDetials ref when the ride is completed
      LookingVehicle.current.style.display = "none";
    });
  }, [receiveMessage]);

  const handleSuggestionClick = (suggestion) => {
    if (activeInput === 'source') {
      setSource(suggestion.description);
    } else if (activeInput === 'destination') {
      setDestination(suggestion.description);
      
    }
    settogglePannel(false);
  };


  async function handleNext() {

    if (!source || !destination) {
      return toast.error('Please enter source and destination');
    }
    setvehiclepanel(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/maps/get-fare?source=${source}&destination=${destination}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(res)
      setFare(res.data);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='main-container'>
      <div className='uber-logo'>
        <img className='logo' src="/images/uber-logo.png" alt="uber-logo" />
      </div>
      <div className='map-container'>
        <div>
          {/* <img className='img' src="./images/map.png" alt="map" />
           */}
           <LiveTracking />
        </div>
      </div>
      <div ref={inputContainer} className='input-container'>
        <h1>Book a Ride</h1>
        {togglePannel && <IoIosArrowDown className='toggle' onClick={() => settogglePannel(false)} />}
        <form >
          <div className='horizontal'></div>
          <input
            onClick={() => { settogglePannel(true); setActiveInput('source'); }}
            type="text"
            placeholder='Enter your Source point'
            value={source}
            onChange={(e) => handleInputChange(e, setSource)}
          />
          <input
            onClick={() => { settogglePannel(true); setActiveInput('destination'); }}
            type="text"
            placeholder='Enter the Destination point'
            value={destination}
            onChange={(e) => handleInputChange(e, setDestination)}
          />
        </form>
        <div ref={suggestions} className='suggestions'>
          {suggestionsList.map((suggestion, index) => (
            <SuggestionLoc
              key={index}
              suggestion={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            />
          ))}
        </div>
        <button onClick={handleNext}>Next</button>
      </div>
      {vehiclepanel && <div className="choosing-vehicle" ref={VehicleRef}>
        <IoIosArrowDown className='toggler' onClick={() => setvehiclepanel(false)} />
        <Vehicle img={"/images/car.png"} mins={"2 mins away"} price={fare.car} capacity={4} selectedveh={VehicleDetials} VehicleRef={VehicleRef} type={"car"} setSelectedVehicle={setSelectedVehicle} />
        <Vehicle img={"/images/auto.png"} mins={"5 mins away"} price={fare.auto} capacity={2} selectedveh={VehicleDetials} VehicleRef={VehicleRef} type={"auto"} setSelectedVehicle={setSelectedVehicle} />
        <Vehicle img={"/images/bike.png"} mins={"3 mins away"} price={fare.bike} capacity={1} selectedveh={VehicleDetials} VehicleRef={VehicleRef} type={"bike"} setSelectedVehicle={setSelectedVehicle} />
      </div>}

      <div className="vehicle-details" ref={VehicleDetials}>
        {console.log(selectedVehicle)}
        <VehicleDetial LookingVehicle={LookingVehicle} VehicleDetialsRef={VehicleDetials} img={`/images/${selectedVehicle}.png`} destination={destination} fare={fare[selectedVehicle]} selectedVehicle={selectedVehicle} source={source} />
      </div>
      <div className="vehicle-details looking-for-vehicle" ref={LookingVehicle}>
        <LookingForVehicle fare={fare[selectedVehicle]} img={`/images/${selectedVehicle}.png`} source={source} selectedVehicle={selectedVehicle}  LookingVehicle={LookingVehicle} setvehiclepanel={setvehiclepanel}/>
      </div>
        {console.log(rideAccepted)}
      {rideAccepted && (
        <>
          {console.log("Rendering RideAccepted component with:", rideAccepted)}
          <div className=' ride-accepted'>
            <RideAccepted rideAccepted={rideAccepted} setRideAccepted={setrideAccepted}/>
          </div>
        </>
      )}
    </div>
  )
}

export default Main;