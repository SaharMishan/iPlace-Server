const HttpError = require("../models/http-error");
const axios = require('axios')

const API_KEY = process.env.MAPTILER_API_KEY

const getCoordinatesForAddress = async (address)=>{

    const SEARCH_BY_PLACE_NAME_URL = `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?fuzzyMatch=true&limit=1&key=${API_KEY}`
   
    const {data} = await axios.get(SEARCH_BY_PLACE_NAME_URL)

    if(!data || data.features.length===0) {
        const error = new HttpError("Couldn't find location for the specific address.",422)
        throw error;
    }

    const coordinates = data.features[0].geometry.coordinates;
    console.log(coordinates);
   

    return {lng: coordinates[0], lat: coordinates[1]};

   


}

module.exports = getCoordinatesForAddress
