const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../Model/mongoModels');

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

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }
        
        const token = singleToken(user.id);
        res.status(200).json({
            status: "success",
            token,
            data: {
                email: user.email,
                username: user.username,
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
        const { username, email, password, role } = req.body;
        
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "User already exists"
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const userCount = await User.countDocuments();
        
        const newUser = await User.create({
            id: `USER${userCount + 1}`,
            username,
            email,
            password: hashedPassword,
            role: role || "staff"
        });
        
        const token = singleToken(newUser.id);
        res.status(201).json({
            status: "success",
            token,
            data: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
}