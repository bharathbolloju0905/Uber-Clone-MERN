import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCaptainContext } from "../../context/captainContext";

 export default function useSignup(){
  const [Loading, setLoading] = useState(false) ;
  const {setCaptain} = useCaptainContext();
  const navigate = useNavigate();

 async function signup({firstname , lastname , email,password, confirmPassword,type,plate,capacity,color,phone}){
   
    const verify = validate({firstname ,password, email,confirmPassword,type,plate,capacity,color,phone})
    if(!verify){
        console.log("veryfing to signup ");

    return  ;;
    }
    setLoading(true)

    try{
        console.log("trying to signup ")
        const response = await fetch("http://localhost:3000/captains/register",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({fullname:{
                firstname,
                lastname
            }, phone,email,password,confirmPassword,vehicle:{
                type,
                capacity,
                plate,
                color
            }}) 
        })
        const data = await response.json();
        
        if(data.errors){
            return toast.error("error while signing up")
        }
        localStorage.setItem("token",data.token)
        setCaptain(data.captain) ;
        navigate("/cap-main")
      return  toast.success("Account created successfully")

    }catch(error){
       return toast.error("An error occured",error.message)
  }
  finally{
    setLoading(false)
  }

}

return {signup,Loading} ;
 }
function validate({firstname,email,password, confirmPassword,type,plate,capacity,color,phone}){
    if(!firstname || !email||!password || !confirmPassword || !type || !plate || !capacity || !color || !phone ){
        toast.error("All fields are required")
        return false ;
    }
    if(password.length<6){
        toast.error("Password must be at least 6 characters")
        return false;
    }
    if(password !== confirmPassword){
        toast.error("Password are not matched")
        return false;
    }
    return true ;
}