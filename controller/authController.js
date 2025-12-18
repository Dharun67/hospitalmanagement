const jwt = require('jsonwebtoken');
const { User } = require('../Model/hospitalModel');

const singleToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Email and password required"
            });
        }

        const user = await User.findOne({ email: email, password: password });
        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "User not found"
            });
        }
        const token = singleToken(user.id);
        res.status(200).json({
            status: "success",
            token,
            data: {
                email: user.email,
                name: user.name,
                role: user.role
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body;
        
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                status: "fail",
                message: "User already exists"
            });
        }
        
        const userCount = await User.countDocuments();
        const newUser = {
            id: userCount + 1,
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            role: role || "staff"
        };
        
        const createdUser = await User.create(newUser);
        const token = singleToken(createdUser.id);
        res.status(201).json({
            status: "success",
            token,
            data: createdUser
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
}