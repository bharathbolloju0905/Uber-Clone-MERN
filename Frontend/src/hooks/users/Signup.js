import { useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/userContext";
import {useNavigate}  from "react-router-dom";


 export default function useSignup(){
  const [Loading, setLoading] = useState(false) ;
  const {setUser} = useUserContext();
  const navigate = useNavigate();
 
 async function signup({firstname , lastname , email,password, confirmPassword}){
   
    const verify = validate({firstname , lastname , email,password, confirmPassword})
    if(!verify){
        console.log("veryfing to signup ");

        return  ;;
    }
    setLoading(true)

    try{
        console.log("trying to signup ")
        const response = await fetch("http://localhost:3000/users/register",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({fullname:{
                firstname,
                lastname
            }, email,password,confirmPassword}) 
        })
        const data = await response.json();
        
        
        if(data.errors){
            return toast.error("error while signing up")
        }
    setUser(data.user) ;
    localStorage.setItem("token",data.token)
    navigate("/main")
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
function validate({firstname , lastname , email,password, confirmPassword}){
    if(!firstname || !email || !password || !confirmPassword ){
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