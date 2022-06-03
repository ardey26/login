// HASHING (BCRYPT)
const bcrypt = require('bcrypt');
const User = require('../models/user')

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
                    res.json({message: message}).status(200);
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
    
            res.json({message: "USER CREATED SUCCESSFULLY"});
            
            
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


module.exports = {
    logInUser,
    registerUser,
    recoverUser
}