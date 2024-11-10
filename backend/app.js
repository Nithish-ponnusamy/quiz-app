const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:',err ));

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
    username: String,
    selectedLanguage: String,
    score: Number
});

const User = mongoose.model('User', userSchema);

// POST endpoint to save user data
app.post('/api/save', async (req, res) => {
    const { username, selectedLanguage, score } = req.body;
    
    try {
        // Check if a user with the same username and selected language already exists
        const existingUser = await User.findOne({ username, selectedLanguage });
        
        if (existingUser) {
            // If user exists, update their score
            existingUser.score = score;  // Update score (or other fields if needed)
            await existingUser.save();
            res.status(200).send('User data updated successfully');
        } else {
            // If user does not exist, create a new record
            const newUser = new User({ username, selectedLanguage, score });
            await newUser.save();
            res.status(200).send('Data saved successfully');
        }
    } catch (error) {
        console.error('Error saving or updating data', error);
        res.status(500).send('Error saving data');
    }
});

// GET endpoint to retrieve all users (optional)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
