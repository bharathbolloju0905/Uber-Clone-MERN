import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCaptainContext } from "../context/captainContext";

export const CaptainProtected = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { captain, setCaptain } = useCaptainContext();
  const [isAuthenticated, setIsAuthenticated] = useState(!!captain);

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/captains/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Captain is authenticated");
          setIsAuthenticated(true);
          setCaptain(data);
        } else {
          console.log("Failed to authenticate captain");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error fetching captain profile:", err);
        setIsAuthenticated(false);
      }
    };

    if (!captain) {
      fetchCaptainProfile();
    }
  }, [token, captain, setCaptain]);

  if (!isAuthenticated) {
    return <Navigate to="/cap-Signin" />;
  }

  return <>{children}</>;
};