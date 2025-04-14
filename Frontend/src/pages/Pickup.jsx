import React, { useState } from 'react'
import { TbArrowCurveRight } from "react-icons/tb"
import { TbArrowLeft } from "react-icons/tb"
import { TbArrowUpBar ,TbArrowCurveLeft,TbUTurnRight} from "react-icons/tb"
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LiveTracking from '../component/LiveTracking';

const Pickup = () => {
    const [showdetails, setshowdetails] = useState(false) ;
    const location = useLocation()
    const ride = location.state?.ride ;
    
    console.log("in pcup ride:",ride)
    const navigate = useNavigate()
async function handleEndRide() {
    const response = await axios.post('http://localhost:3000/captains/ending-ride', { ride }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (response.status === 200) {
        console.log("response from ending ride:", response.data);
        navigate('/cap-main', { state: { activateCaptain: true } }); // Pass state to activate captain
        toast.success("Ride ended successfully, Have a nice day");
    } else {
        console.log("error in ending ride:", response.data);
    }
}
    return (
        <div className='main-container '>
            <div className='uber-logo'>
                <img className='logo' src="/images/uber-logo.png" alt="uber-logo" />
            </div>
            <div className='map-container mt-5'>
                <div>
                    <LiveTracking />
                </div>
                <div className='navigations'>
                    <TbArrowCurveRight className='icon-right' />
                    <p>Turn right in 70m after alpha cafe</p>
                </div>
            </div>
            <div className='trip-navigations'>
                <div className='trip-user' onClick={()=> setshowdetails(!showdetails)}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqb3ltH2zwdPZqPg3H_6v5uEb4kjPF2PXfgiUDiWJT3vu1XNhFp29qVyQZ5y70AtYR7K8&usqp=CAU" alt="user-img" />
                    <div className='utility-flex'>
                        <p>pickpup location</p>
                        <h1>{ride?.userId.fullname.firstname+" "+ ride?.userId.fullname.lastname}</h1>
                    </div>

                </div>
                {!showdetails&& <TbArrowUpBar className='icon-up' onClick={()=> setshowdetails(!showdetails)} />}
                {showdetails && (<> <div className='space'>
                    <div className='utility-flex space'>
                        <div className='utility-flex details-trip'>
                            <p>Time</p>
                            <h1>5mins</h1>
                        </div>
                        <div className='utility-flex details-trip'>
                            <p>Distance</p>
                            <h1>5mins</h1>
                        </div>
                        <div className='utility-flex details-trip'>
                            <p>Cost</p>
                            <h1>${ride?.fare}</h1>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleEndRide} className="end-ride-btn">End the Ride</button>
                    </div>
                </div>
                <div>
                    <div className='navigations pos-static-adjust'>
                        <TbArrowCurveRight className='icon-right' />
                        <p>Turn right in 70m after alpha cafe</p>
                    </div>
                    <div className='navigations pos-static-adjust'>
                        <TbArrowLeft className='icon-right' />
                        <p>Turn left in 80m after Reddy gari hotel</p>
                    </div>
                    <div className='navigations pos-static-adjust'>
                        <TbArrowCurveLeft className='icon-right' />
                        <p>Turn left in 100m after mukesh hospital</p>
                    </div>
                    <div className='navigations pos-static-adjust'>
                        <TbUTurnRight className='icon-right' />
                        <p>Take U-Turn in 170m after FB cakes</p>
                    </div>
                    <div className='navigations pos-static-adjust'>
                        <TbArrowLeft className='icon-right' />
                        <p>Turn left in 80m after Reddy gari hotel</p>
                    </div>
                    <div className='navigations pos-static-adjust'>
                        <TbArrowCurveLeft className='icon-right' />
                        <p>Turn left in 100m after mukesh hospital</p>
                    </div>
                    <div className='navigations pos-static-adjust'>
                        <TbUTurnRight className='icon-right' />
                        <p>Take U-Turn in 170m after FB cakes</p>
                    </div>
                </div></>)}
            </div>
        </div>
    )
}

export default Pickup