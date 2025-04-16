import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '73vh',
};

const darkModeStyle = [
    {
        elementType: 'geometry',
        stylers: [{ color: '#212121' }],
    },
    {
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#212121' }],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ color: '#757575' }],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#181818' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{ color: '#2c2c2c' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#3c3c3c' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }],
    },
];

const GetDirections = ({ origin, destination }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Ensure you use VITE_ prefix
    });

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [steps, setSteps] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);

    // Fetch directions
    useEffect(() => {
        if (isLoaded && origin && destination) {
            const directionsService = new google.maps.DirectionsService();
            directionsService.route(
                {
                    origin,
                    destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirectionsResponse(result);
                        const routeSteps = result.routes[0].legs[0].steps.map((step) => step.instructions);
                        setSteps(routeSteps);
                    } else {
                        console.error(`Error fetching directions: ${status}`);
                    }
                }
            );
        }
    }, [isLoaded, origin, destination]);

    // Track captain's location and update marker
    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.error('Error getting location:', error),
            { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    if (!isLoaded) {
        return <div>Loading Map...</div>;
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentLocation || directionsResponse?.routes[0]?.legs[0]?.start_location || { lat: 0, lng: 0 }}
                zoom={14}
                options={{
                    styles: darkModeStyle,
                    disableDefaultUI: true,
                    clickableIcons: false,
                }}
            >
                {/* Render directions */}
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}

                {/* Render captain's current location marker */}
                {currentLocation && (
                    <Marker
                        position={currentLocation}
                        icon={{
                            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        }}
                    />
                )}
            </GoogleMap>

            {/* Directions list */}
            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h3>Directions:</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {steps.map((step, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            <span dangerouslySetInnerHTML={{ __html: step }} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GetDirections;
