import { useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/userContext";
import {useNavigate}  from "react-router-dom";

 export default function useSignin(){
  const [Loading, setLoading] = useState(false) ;
    const {setUser} = useUserContext();
    const navigate = useNavigate();

 async function signin({ email,password}){
   
    const verify = validate({email,password})
    if(!verify){
        return  ;;
    }
    setLoading(true)
   

    try{
        console.log("trying to signin ")
        const response = await fetch("http://localhost:3000/users/login",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({email,password}) });
        const data = await response.json();

        if(data.errors){
            return toast.error(`Incorrect email or password`);
        }
        setUser(data.user) ;
        localStorage.setItem("token",data.token)
        navigate("/main")
      return  toast.success("Account Logged In successfully")

    }catch(error){
       return toast.error(`"An error occured"`)
  }
  finally{
    setLoading(false)
  }

}

return {signin,Loading} ;
 }
function validate({ email,password}){
    if( !email || !password){
        toast.error("All fields are required")
        return false ;
    }
    if(password.length<6){
        toast.error("Password must be at least 6 characters")
        return false;
    }
    return true ;
}