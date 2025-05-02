const axios = require('axios');

const getISSLocation = async () => {
    try {
        const response = await axios.get('http://api.open-notify.org/iss-now.json');
        const { latitude, longitude } = response.data.iss_position;
        return {
            latitude,
            longitude
        };
    } catch (error) {
        console.error('Error fetching ISS location:', error);
        throw error;
    }
};  
module.exports =getISSLocation;