const express = require('express');
const router = express.Router();
const {check} = require("express-validator")
const usersControllers = require("../controllers/users-controller")
const fileUpload = require("../middleware/fileUpload")

router.get("/",usersControllers.getAllUsers)
router.post("/signup",fileUpload.single("image"),[check("name").not().isEmpty(),check("email").normalizeEmail().isEmail(),check("password").isLength({min: 6})],usersControllers.signUp)
router.post("/login",[check("email").not().isEmpty().normalizeEmail().isEmail(),check("password").isLength({min: 6})],usersControllers.login)




module.exports = router;