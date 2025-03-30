
const axios = require('axios');
const captainModel = require("../models/captain.model");

// Ensure geospatial index is created on the location field

module.exports.getCoordinates = async function (address) {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        if(response.data.status === "OK") {
            
            return response.data.results[0].geometry.location;
        }
        return null;
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports.getDistance = async function (origin, destination) {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);

        console.log(response.data);
        if(response.data.status === "OK") {
            if(response.data.rows[0].elements[0].status !== "ZERO_RESULTS") {
                return {
                    distance: response.data.rows[0].elements[0].distance,
                    duration: response.data.rows[0].elements[0].duration
                };
            }
        }
        return null;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports.getSuggestions = async function (input) {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
       
        if(response.data.status === "OK") {
            return response.data.predictions;
        }
        return null;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports.getFare = async function (origin, destination) {
    const { getDistance } = require('./map.services');
    try {
        const distanceData = await getDistance(origin, destination);
        if (!distanceData) {
            return null;
        }

        const { distance, duration } = distanceData;

        // Fare calculation logic
        const baseFare = {
            car: 50,
            bike: 30,
            auto: 40
        };

        const perKmRate = {
            car: 10,
            bike: 5,
            auto: 7
        };

        const perMinuteRate = {
            car: 2,
            bike: 1,
            auto: 1.5
        };

        const distanceInKm = distance.value / 1000; // Convert meters to kilometers
        const timeInMinutes = duration.value / 60; // Convert seconds to minutes

        const fare = {
            car: Math.round(baseFare.car + (distanceInKm * perKmRate.car) + (timeInMinutes * perMinuteRate.car)),
            bike: Math.round(baseFare.bike + (distanceInKm * perKmRate.bike) + (timeInMinutes * perMinuteRate.bike)),
            auto: Math.round(baseFare.auto + (distanceInKm * perKmRate.auto) + (timeInMinutes * perMinuteRate.auto))
        };

        return fare;
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports.getnearbyCaptains = async function ( ltd, lng, distance ) {
    try {
        // Validate inputs
        if (!ltd ||!lng || !distance) {
            throw new Error('Invalid coordinates: ltd, lng and distance are required.')
          
        }
        console.log(ltd,lng,distance)
    await captainModel.collection.createIndex({ location: "2dsphere" });

        const nearbyCaptains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[ltd, lng], distance /6371 ] // Convert meters to miles
                }
            }
        });

        return nearbyCaptains;
    } catch (error) {
        console.log(error.message || error);
        return error;
    }
};