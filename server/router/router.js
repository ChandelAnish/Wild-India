const express = require('express')
const mysql = require('mysql2')
// const connectDB = require('../connectionDB/connectionDB')

const { testing, login, signup, otpverification, postSpecie, getSpecies } = require('../controllers/controllers')

const router = express.Router();

//testing
router.get('/test', testing)


//login
router.post('/login', login)

//sign-up
router.post('/signup', signup)

//otp verification
router.post('/otpverification', otpverification)

//post Specie & get Species
router.route('/animalDetails').post(postSpecie).get(getSpecies)

module.exports = router;