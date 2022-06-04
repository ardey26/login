// DEPENDENCIES
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// DATA MODEL
const User = require('../models/user')

// .ENV ACCESS
require('dotenv').config();

// JWT TOKEN GENERATION
const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS, {expiresIn: '30d'});
}



// @desc    LOGIN USER
// @route   POST /user/login
// @access  PUBLIC
const logInUser = async(req, res) => {
        try {
            const { username, password } = req.body;
    
            const user = await User.findOne({username: username});
    
            if (user) {
                const validatedPassword = await bcrypt.compare(password, user.password);
    
                if (validatedPassword){
                    const message = "SUCCESSFUL LOGIN"

                    res.json({
                        _id: user.id,
                        name: user.username,
                        password: user.password,
                        token: generateJWT(user._id)
                    });

                    console.log(message);
                    
                }
                else{
                    const message = "FAILED LOGIN"
                    res.json({error: message}).status(400);
                    console.log(message);
                }
    
            }
            else{
                res.json({error: "User does not exist"});
            }
            
            
        } catch (error) {
            console.error(error.message);
        }
    }


// @desc    REGISTER USER
// @route   POST /user/register
// @access  PUBLIC
const registerUser = async(req, res) => {
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
    
            res.json({
                        _id: user.id,
                        name: user.username,
                        password: user.password,
                        token: generateJWT(user._id)
                    }).status(201);
            
            
        } catch (error) {
            console.log(error);
            res.json({error: "USER CANNOT BE CREATED"});
        }
}


// @desc    RECOVER USER
// @route   PUT /user/recover
// @access  PUBLIC
const recoverUser = async(req, res) => {
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
}

// @desc    GET USER POSTS
// @route   GET /user/me
// @access  PRIVATE
const getUserPosts = async(req, res) => {
    const { _id, username, password } = await User.findById(req.user.id);

    res.json({
        id: _id,
        username: username
    })
}


module.exports = {
    logInUser,
    registerUser,
    recoverUser,
    getUserPosts
}