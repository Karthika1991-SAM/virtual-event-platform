const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');
const nodemailer = require('nodemailer');
const sendEmail = require('../utils/emailService');
require('dotenv').config();



const registerUser = async (req, res) => {
 
  const { username, password, email,role } = req.body; // `role`: 'organizer' or 'attendee'
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
   }
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword, role };
  users.push(newUser);
   // Send a welcome email after successful registration
   

  
  res.status(201).json({ message: 'User registered successfully' });
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { registerUser, loginUser };
