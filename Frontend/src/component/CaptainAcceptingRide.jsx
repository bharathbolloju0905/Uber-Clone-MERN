import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { FaRegCircle } from "react-icons/fa";
import {Link} from 'react-router-dom'
const CaptainAcceptingRide = ({ setridedetails ,setconfirmtion,confirmtion,ridedetails}) => {
    function handleClose(){
        setconfirmtion(false)
        setridedetails(false)
    }
  return (
    <div className='ride-details-container hight-full'>
                <h1>New Ride Details</h1>
                <div className='utility-flex user-ride'>
                    <div className='utility-flex user-info'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqb3ltH2zwdPZqPg3H_6v5uEb4kjPF2PXfgiUDiWJT3vu1XNhFp29qVyQZ5y70AtYR7K8&usqp=CAU" alt="" />
                        <h3>Bharath Bolloju</h3>
                    </div>
                    <h3>
                        2.3 KM
                    </h3>
                </div>
                <div className='suggest no-border content-start' >
                    <FaRegCircle className='imgloc img-loc' />
                    <div>
                        <p><b>3-5/17/D bharath nagar Ramanthapur</b></p>
                        <p className='para'>Medchal, Telangana</p>
                    </div>
                </div>
                <div className='suggest no-border content-start' >
                    <FaLocationDot className='imgloc' />
                    <div>
                        <p><b>3-5/17/D bharath nagar Ramanthapur</b></p>
                        <p className='para'>Medchal, Telangana</p>
                    </div>
                </div>
                <div className="buttons">
                    <div className='ride-btn accept-confirm'><Link to="/user-pickup">Cofirm Accepting the Ride</Link></div>
                    <div className='ride-btn coloring' onClick={handleClose } >Cancel the Ride</div>
                </div>
            </div>
  )
}

export default CaptainAcceptingRide  ;