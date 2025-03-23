const mapService = require("../services/map.services")


module.exports.getCoordinates = async (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.status(400).send("Address is required");
    }
    try {
        const coordinates = await mapService.getCoordinates(address);
        if (!coordinates) {
            return res.status(404).send("Coordinates not found");
        }
       return res.send(coordinates);
    } catch (error) {
       return res.status(500).json({ error: error.message });

    }
}
module.exports.getsource = async (req, res) => {
    const origin = req.query.origin;
    const destination = req.query.destination;
    if (!origin || !destination) {
        return res.status(400).send("Origin and Destination are required");
    }
    if (origin === destination) {
        return res.status(400).send("Origin and Destination should be different");
    }
    if(origin.length < 3 || destination.length < 3) {
        return res.status(400).send("Origin and Destination length should be greater than 2");
    }
    try {
        const source = await mapService.getsource(origin, destination);
        if (!source) {
            return res.status(404).send("source not found");
        }
        return res.send(source);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getSuggestions = async (req, res) => {
    const input = req.query.input;
    if (!input) {
        return res.status(400).send("Input is required");
    }
    if(input.length < 3) {
        return res.status(400).send("Input length should be greater than 2");
    }
    try {
        const suggestions = await mapService.getSuggestions(input);
        if (!suggestions) {
            return res.status(404).send("Suggestions not found");
        }
        return res.send(suggestions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getDistance = async (req, res) => {
    module.exports.getDistance = async (req, res) => {
        const origin = req.query.origin;
        const destination = req.query.destination;
        if (!origin || !destination) {
            return res.status(400).send("Origin and Destination are required");
        }
        try {
            const distance = await mapService.getDistance(origin, destination);
            if (!distance) {
                return res.status(404).send("Distance not found");
            }
            return res.send(distance);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
}

module.exports.getFare = async (req, res) => {
    const source = req.query.source;
    const destination = req.query.destination;
    if (!source || !destination) {
        return res.status(400).send("source and destination are required");
    }
    try {
        const fare = await mapService.getFare(source, destination);
        if (!fare) {
            return res.status(404).send("Fare not found");
        }
        return res.send(fare);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}