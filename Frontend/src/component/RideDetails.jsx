import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { FaRegCircle } from "react-icons/fa";

const RideDetails = ({ setridedetails ,setconfirmtion,newRide}) => {
    function handleClick(){
        setconfirmtion(true)
        setridedetails(false)
    }
    function handleClose(){
        setconfirmtion(false)
        setridedetails(false)
    }
    return (
        <div className='ride-details-container '>
            <h1>New Ride Details</h1>
            <div className='utility-flex user-ride'>
                <div className='utility-flex user-info'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqb3ltH2zwdPZqPg3H_6v5uEb4kjPF2PXfgiUDiWJT3vu1XNhFp29qVyQZ5y70AtYR7K8&usqp=CAU" alt="" />
                    <h3>{newRide?.userId.fullname.firstname + " "+ newRide?.userId.fullname.lastname}</h3>
                </div>
                <h3>
                    2.3 KM
                </h3>
            </div>
            <div className='suggest no-border content-start' >
                <FaRegCircle className='imgloc img-loc' />
                <div>
                    <p><b>{newRide?.pickup}</b></p>
                    {/* <p className='para'>Medchal, Telangana</p> */}
                </div>
            </div>
            <div className='suggest no-border content-start' >
                <FaLocationDot className='imgloc' />
                <div>
                    <p><b>{newRide?.destination}</b></p>
                    {/* <p className='para'>Medchal, Telangana</p> */}
                </div>
            </div>
            <div className="buttons">
                <div className='ride-btn accept' onClick={handleClick}>Accept the Ride</div>
                <div className='ride-btn coloring' onClick={handleClose} >Cancel the Ride</div>
            </div>
        </div>
    )
}

export default RideDetails ;