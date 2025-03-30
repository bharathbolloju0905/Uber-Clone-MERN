import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    setSocket(newSocket);   

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Function to listen to a specific event
  const receiveMessage = (event, callback) => {
    if (socket) {
      console.log("socket",socket)
      socket.on(event, callback);
    }
  };

  // Function to emit a specific event
  const sendMessage = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, receiveMessage, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);