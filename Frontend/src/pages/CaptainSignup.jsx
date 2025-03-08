import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useSignup from '../hooks/captains/captainSignup';
const CaptainSignup = () => {
  const first = useRef(null)
  const second = useRef(null)
  const [credentials, setcredentials] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: "",
    plate: "",
    capacity: "",
    color: "",
  })
const {Loading,signup} = useSignup() ;
  function handleChange(e) {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  function handlePage(e){
    e.preventDefault()
    first.current.style.display = "none",
      second.current.style.display = "flex"
    }
   async function handleSubmit(e){
      e.preventDefault();
      console.log(credentials)
      await signup(credentials);
      setcredentials({firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: "",
        plate: "",
        capacity: "",
        color: "",
      phone:""})

    }
  return (
    <div className='credentials utility-flex h-w-100 bg-features'>
      <div><img src="/images/uber-logo.png" alt="uber-logo" /></div>
      <div className='signin utility-flex'>
        <h1>Sign up as Captain</h1>
        <form className='utility-flex' ref={first}>
          <input required type='firstname' value={credentials.firstname} onChange={handleChange} name='firstname' placeholder='your firstname' />
          <input required type='lastname' value={credentials.lastname} onChange={handleChange} name='lastname' placeholder='your lastame' />
          <input required type='email' value={credentials.email} onChange={handleChange} name='email' placeholder='youremail@gmail.com' />
          <input required type='password' value={credentials.password} onChange={handleChange} name='password' placeholder='yourpassword' />
          <input required type='password' value={credentials.confirmPassword} onChange={handleChange} name='confirmPassword' placeholder='confirmPassword' />
          <button type='submit' onClick={handlePage}>Next</button>
          <p><Link to="/Cap-signin">Already have a account? <strong>Signin</strong></Link></p>
          <button className='other'><Link to="/signup">Sign up as user</Link></button>
        </form>
        <form className='utility-flex nextpage' ref={second}>
          <h1>Vehicle details</h1>
          <select required value={credentials.type} onChange={handleChange} name='type'>
            <option value="" disabled>Select vehicle type</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="auto">Auto</option>
            <option value="car">Car</option>
          </select>
          <input required type='text' value={credentials.plate} onChange={handleChange} name='plate' placeholder='registration number (number plate)' />
          <input required type='text' value={credentials.capacity} onChange={handleChange} name='capacity' placeholder='capacity' />
          <input required type='text' value={credentials.color} onChange={handleChange} name='color' placeholder='vehicle color' />
          <input required type='number' value={credentials.phone} onChange={handleChange} name='phone' placeholder='phone number' />
          <button type='submit' onClick={handleSubmit}>Sign up </button>
        </form>
      </div>
    </div>
  )
}

export default CaptainSignup;