const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require("./middleware/authentication")
const userModel = require("./models/user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const JWT_SECRET = process.env.JWT_SECRET;

app.get("/api", (req,res)=>{
    res.send("backend running with express");
});

app.post("/api/register", async (req,res)=>{
    try {
        let user = await userModel.findOne({email: req.body.email});
        if(user) return res.status(400).json("Account already exists"); 

        let {fullname, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let createdUser = await userModel.create({
            fullname,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ email: createdUser.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            message: "User registered successfully", 
            token, 
            user: { email: createdUser.email, fullname: createdUser.fullname } 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    } 
});

app.post("/api/login", async (req,res)=>{
    let {email, password} = req.body;
    let user = await userModel.findOne({email});

    if(user){
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ 
            message: "User logged-in successfully", 
            token, 
            user: { email: user.email, fullname: user.fullname } 
        });
    }
});


app.get("/api/dashboard", verifyToken, async (req,res) => {
    try {
        const user = await userModel.findOne({email: req.user.email}).select('-password'); 
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({user, message: `Welcome back, ${user.fullname}!`});
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log("Server running on port ",PORT);
});