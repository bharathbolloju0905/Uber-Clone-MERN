import React, { useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { FaRegCircle } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const StartingRide = ({ setridedetails, setconfirmtion, newRide, setStartRide }) => {
    const [otp, setotp] = useState(null);
    const navigate = useNavigate();
    console.log("strating ride new ride:", newRide);
    async function handleClick() {
        setconfirmtion(true);
        setridedetails(false);
        const response = await axios.post('http://localhost:3000/captains/starting-ride', { newRide, otp }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.status === 200) {
            console.log("response from starting ride:", response.data);
            navigate('/user-pickup', { state: { ride: response.data.ride } });
        }
        else {
            console.log("error in starting ride:", response.data);
        }
    }
    function handleClose() {
        setconfirmtion(false);
        setridedetails(false);
        setStartRide(false)
    }
    return (
        <div className='ride-details-container zee'>
            <h1>New Ride Details</h1>
            <div className='utility-flex user-ride'>
                <div className='utility-flex user-info'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqb3ltH2zwdPZqPg3H_6v5uEb4kjPF2PXfgiUDiWJT3vu1XNhFp29qVyQZ5y70AtYR7K8&usqp=CAU" alt="" />
                    <h3>{newRide?.userId.fullname.firstname + " " + newRide?.userId.fullname.lastname}</h3>
                </div>
                <h3>
                    2.3 KM
                </h3>
            </div>
            <div className='suggest no-border content-start' >
                <FaRegCircle className='imgloc img-loc' />
                <div>
                    <p><b>{newRide?.pickup}</b></p>
                </div>
            </div>
            <div className='suggest no-border content-start' >
                <FaLocationDot className='imgloc' />
                <div>
                    <p><b>{newRide?.destination}</b></p>
                </div>
            </div>
            <div>
                <h3>Enter OTP</h3>
                <input type="number" value={otp} onChange={(e) => setotp(e.target.value)} placeholder='Enter OTP' className='otp-input' style={{ width: "100%", height: "50px", borderRadius: "10px", border: "1px solid white", paddingLeft: "20px", marginTop: "10px", backgroundColor: "black", fontSize: "18px" }} required />
            </div>
            <div className="buttons">
                <div className='ride-btn accept' onClick={handleClick}>Start Ride</div>

            </div>
        </div>
    )
}

export default StartingRide;