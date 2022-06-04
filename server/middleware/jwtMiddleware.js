const jwt = require('jsonwebtoken');

const User = require('../models/user');

require('dotenv').config();

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // RETRIEVE TOKEN
      token = req.headers.authorization.split(' ')[1];

      // VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.JWT_ACCESS)

      // RETRIEVE USER WITH TOKEN ID PAYLOAD => ADD <user> PROPERTY TO REQUEST OBJECT
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.json({error: 'AUTHORIZATION INVALID'}).status(401)
    }
  }

  if (!token) {
    res.json({error: 'AUTHORIZATION INVALID (NULL TOKEN)'}).status(401)
  }
}

module.exports = { protect }