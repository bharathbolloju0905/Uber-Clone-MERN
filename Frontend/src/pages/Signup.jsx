import React ,{useState}from 'react'
import { Link } from 'react-router-dom';
import useSignup from '../hooks/users/Signup';

const Signup = () => {
  const {Loading,signup} = useSignup() ;
  const [credentials, setcredentials] = useState({
    firstname: '',
    lastname: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    function handleChange(e) {
      setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e){
      e.preventDefault()
      await signup(credentials);
      setcredentials({
        firstname: '',
        lastname: '',
          email: '',
          password: '',
          confirmPassword: ''
        })

    }
  return (
    <div className='credentials utility-flex h-w-100 bg-features'>
    <div><img src="/images/uber-logo.png" alt="uber-logo" /></div>
    <div className='signin utility-flex'>
      <h1>Sign up as User</h1>
      <form className='utility-flex'>
        <input required type='firstname' value={credentials.firstname}  onChange={handleChange} name='firstname' placeholder='your firstname' />
        <input required type='lastname' value={credentials.lastname}  onChange={handleChange} name='lastname' placeholder='your lastame' />
        <input required type='email' value={credentials.email}  onChange={handleChange} name='email' placeholder='youremail@gmail.com' />
        <input required type='password' value={credentials.password} onChange={handleChange} name='password'  placeholder='yourpassword' />
        <input required type='password' value={credentials.confirmPassword} onChange={handleChange} name='confirmPassword'  placeholder='confirmPassword' />
        <button type='submit' onClick={handleSubmit} disabled={Loading}>{Loading? "Loading..." :"Sign up"} </button>
        <p><Link to="/signin">Already have a account? <strong>SignIn</strong></Link></p>
      </form>
        <button className='other' ><Link to="/cap-Signup">Sign up as captain</Link></button>
    </div>
  </div>
  )
}

export default Signup