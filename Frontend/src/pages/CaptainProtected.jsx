

import { Navigate } from "react-router-dom";
import { useEffect ,useState} from "react";

export const CaptainProtected = ({children}) => {
   const [token,settoken] = useState(localStorage.getItem("token"))
useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
        } else {
            try{
                async()=>{
                    const response = await fetch('http://localhost:3000/captains/profile',{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }})
                    if(response.status.OK){
                        setIsAuthenticated(true);
                    }
                    else{
                        setIsAuthenticated(false);
                    }
                }
            }catch(err){
                setIsAuthenticated(false);
            }
        }
    }, [token]);

    const [isAuthenticated, setIsAuthenticated] = useState(token);

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    return (
        <>
            {children}
        </>
    );

};