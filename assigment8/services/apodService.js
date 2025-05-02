const axios = require('axios');
const { nasaApiKey } = require('../config/apiConfig');

const getAPOD = async () => {
try{
     const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`);
     const { title, explanation, date, url: imageUrl } = response.data;
        return {
            title,
            explanation,
            date,
            imageUrl
        };


 }catch (error) {
            console.error('Error fetching APOD:', error);
            throw error;
}
};
module.exports = getAPOD;