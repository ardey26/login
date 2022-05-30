// DEPENDENCIES
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// HASHING (BCRYPT)
const bcrypt = require('bcrypt');

// DATA MODEL
const User = require('./models/user');

// .ENV CONFIGURATION
require('dotenv').config();

// EXPRESS APP
const app = express();

// <PORT> IN .ENV === NULL => DEFAULT TO 500
const PORT = process.env.PORT || 5000

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.listen(PORT);

// MONGOOSE CONNECTION TO MONGODB CLUSTER
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// DEFAULT GET ROUTE
app.get("/", (req, res) => {
    res.send("connected successfully!");
})

// LOGIN ROUTE
app.post("/login", async(req, res) => {
    try {
        console.log(req.body)
        const { username, password } = req.body;

        const user = await User.findOne({username: username});

        if (user) {
            const validatedPassword = await bcrypt.compare(password, user.password);

            if (validatedPassword){
                res.json({message: "Logged in successful"}).status(200);
            }
            else{
                res.json({error: "Log in failed, password/username is invalid"}).status(400);
            }

        }
        else{
            res.json({error: "User does not exist"});
        }
        
        
    } catch (error) {
        console.error(error.message);
    }
})

// REGISTER ROUTE
app.post("/register", async(req, res) => {
    try {
        const { username } = req.body;
        const { password } = req.body;
        
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username: username,
            password: hashedPassword
        })

        await user.save();

        res.json({message: "USER CREATED SUCCESSFULLY"});
        
        
    } catch (error) {
        console.log(error);
        res.json({error: "USER CANNOT BE CREATED"});
    }
})

// FORGOTTEN PASSWORD ROUTE
app.put("/login/recover", async (req, res) => {
    try {
        const { username, password, newPassword } = req.body;

        const user = await User.findOne({username: username});

        if (user) {
            const validatedPassword = await bcrypt.compare(password, user.password);

            if (validatedPassword){
                const saltRounds = 10
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                user.password = hashedPassword

                await user.save();

                res.json({message: "PASSWORD CHANGED"});
            }
            else{
                res.json({error: "Log in failed, password/username is invalid"}).status(400);
            }

        }
        else{
            res.json({error: "User does not exist"});
        }
    } catch (error) {
     console.log(error.message)   
    }
})