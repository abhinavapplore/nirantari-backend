const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const uri = process.env.DB;

const connection = async (req, res) => {
    try {
        await mongoose.connect(uri, {})
        console.log("🎉 Connection Established");
    } catch (error) {
        console.log('Oops Error:', error.message);
    }
}

module.exports = { connection };