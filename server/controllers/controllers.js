// const connectDB = require("../connectionDB/connectionDB")
const { sendmail } = require("../smtp/smtp")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const testing = (req, res) => {
    console.log("testing")
    res.send('test successfull again')
}


//login

const login = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body.username || !req.body.password) {
            return res.status(401).json({ login: false, msg: 'enter all credentials' });
        }

        const user = await prisma.userinfo.findUnique({
            where: { username: req.body.username }
        });

        if (!user) {
            return res.status(200).json({ login: false, msg: 'user not found' });
        }

        if (user.password !== req.body.password) {
            return res.status(401).json({ login: false, msg: 'incorrect user credentials' });
        }

        if (user.status === 'Suspended') {
            return res.status(401).json({ login: false, msg: 'account suspended' });
        }

        if (user.status === 'Unverified') {
            return res.status(401).json({ login: false, msg: 'email Unverified &nbsp;<a href="../otpverification/index.html" onclick="emailVerification()">verify now</a>' });
        }

        return res.status(200).json({
            login: true,
            userdetails: { ...user },
            msg: 'login successful'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ login: false, msg: 'internal server error' });
    }
};


//signup
const signup = async (req, res) => {
    const { username, email, password, phoneno } = req.body;

    // Check for all credentials
    if (!username || !email || !password || !phoneno) {
        return res.status(401).json({ login: false, msg: 'Enter all credentials' });
    }

    try {
        // Check for already registered email
        const existingEmail = await prisma.userinfo.findUnique({
            where: { email },
        });

        if (existingEmail) {
            return res.status(403).json({ login: false, msg: 'Email already exists' });
        }

        // Check for username already exists
        const existingUsername = await prisma.userinfo.findUnique({
            where: { username },
        });

        if (existingUsername) {
            return res.status(403).json({ signup: false, msg: 'User already exists' });
        }

        // Insert new user
        const newUser = await prisma.userinfo.create({
            data: {
                username,
                email,
                password,
                phoneno,
            },
        });

        return res.status(200).json({
            signup: true,
            msg: 'Signed up successfully',
            userdetails: { username, email, password, phoneno },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ signup: false, msg: 'Internal server error' });
    }
};

//otp verification
let otp;
const otpverification = async (req, res) => {
    if (req.body.email) {
        try {
            otp = await sendmail(req.body.email);
            return res.status(200).json({ msg: "OTP sent" });
        } catch (error) {
            return res.status(500).json({ msg: "OTP sent faliure" });
        }
    }
    if (otp !== req.body.userotp) {
        return res.status(200).json({ success: false, msg: "otp not verified" });
    }
    else {
        return res.status(200).json({ success: true, msg: "otp verified" });
    }
}

//post Specie
const postSpecie = async (req, res) => {
    const newSpecie = await prisma.animalsDetails.create({ data: req.body });
    res.status(200).json(newSpecie)
}

//get Species
const getSpecies = async (req, res) => {
    const species = await prisma.animalsDetails.findMany();
    res.status(200).json(species)
}


module.exports = { testing, login, signup, otpverification, postSpecie, getSpecies };