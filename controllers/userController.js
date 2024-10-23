const User = require('../models/User');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new user
exports.createUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
    try {
        // Use findByIdAndDelete to delete the user by ID
        const user = await User.findByIdAndDelete(req.params.id);
        
        // If no user is found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return a success message
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
