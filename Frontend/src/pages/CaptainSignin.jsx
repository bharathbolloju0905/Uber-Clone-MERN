import React ,{useState} from 'react'
import { Link } from 'react-router-dom';
import useSignin from '../hooks/captains/captainSignin';
const CaptainSignin = () => {
  const [credentials, setcredentials] = useState({
    email: '',
    password: ''
  })
  const {Loading,signin} = useSignin()
  function handleChange(e) {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
 async function handleSubmit(e){
    e.preventDefault()
    await signin(credentials)
  setcredentials({ email: '',
    password: ''})
  }
  
  return (
    <div className='credentials utility-flex h-w-100 bg-features'>
      <div><img src="/images/uber-logo.png" alt="uber-logo" /></div>
      <div className='signin utility-flex'>
        <h1>Sign In as Captain</h1>
        <form className='utility-flex'>
          <input required type='email' value={credentials.email}  onChange={handleChange} name='email' placeholder='youremail@gmail.com' />
          <input required type='password' value={credentials.password} onChange={handleChange} name='password'  placeholder='yourpassword' />
          <button onClick={handleSubmit} disabled={Loading}>{Loading? "Loading...": "Sign In"}</button>
          <p><Link to="/cap-Signup">Don't you have account? <strong>Signup</strong></Link></p>
        </form>
          <button className='other' ><Link to="/signin">Sign In as user </Link></button>
      </div>
    </div>
  )
}

export default CaptainSignin ;