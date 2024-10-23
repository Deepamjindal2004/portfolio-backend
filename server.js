const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Portfolio Backend API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
