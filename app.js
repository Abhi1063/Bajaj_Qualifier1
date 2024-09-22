// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Use body-parser to handle JSON data
app.use(bodyParser.json());

// POST method for /bfhl
app.post('/bfhl', (req, res) => {
    // Extract data from the request body
    const { data, file_b64 } = req.body;

    let numbers = [];
    let alphabets = [];
    let highestLowercase = null;

    // Process the data to find numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) { // Check if it's a number
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) { // Check if it's an alphabet
            alphabets.push(item);
            if (/[a-z]/.test(item)) {
                if (!highestLowercase || item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        }
    });

    // Respond with the processed data
    res.json({
        is_success: true,
        user_id: "your_name_01011990",  // Replace with your name and birthdate
        email: "your_email@college.com",  // Replace with your email
        roll_number: "ROLL123",  // Replace with your roll number
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

// Start the server
app.listen(3000, () => {
    console.log('API is running on http://localhost:3000');
});
