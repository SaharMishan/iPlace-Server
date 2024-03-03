const express = require('express');
const {check} = require("express-validator")
const fileUpload = require("../middleware/fileUpload")
const placesControllers = require('../controllers/places-controllers');
const auth = require("../middleware/auth")
const router = express.Router();

router.get('/:placeId', placesControllers.getPlaceById);

router.get('/user/:userId', placesControllers.getPlacesByUserId);

router.use(auth) // if user is not auth the code will stop here and he doesnt have access to the other routes below.

router.post('/',fileUpload.single("image"),[check('title').not().isEmpty(), check("description").isLength({min: 5}),check("address").not().isEmpty()], placesControllers.createPlace);

router.patch('/:placeId',[check("title").not().isEmpty(),check("description").isLength({min: 5})] , placesControllers.updatePlace);

router.delete('/:placeId', placesControllers.deletePlace);

module.exports = router;
