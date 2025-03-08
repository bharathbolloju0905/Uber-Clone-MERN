

import { Navigate } from "react-router-dom";
import { useEffect ,useState} from "react";

export const Protected = ({children}) => {
   const [token,settoken] = useState(localStorage.getItem("token"))
useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
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