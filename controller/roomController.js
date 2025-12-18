const Room = require('../Model/roomModel');

// Generate unique room ID
const generateRoomId = async () => {
    const lastRoom = await Room.findOne().sort({ id: -1 });
    if (!lastRoom) return 'R001';
    const lastNum = parseInt(lastRoom.id.replace('R', ''));
    return `R${String(lastNum + 1).padStart(3, '0')}`;
};

// GET all rooms
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({
            status: "success",
            count: rooms.length,
            data: rooms
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

// GET rooms by type
exports.getRoomsByType = async (req, res) => {
    try {
        const { type } = req.params;
        const rooms = await Room.find({ type });
        
        res.status(200).json({
            status: "success",
            roomType: type,
            count: rooms.length,
            data: rooms
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

// CREATE room
exports.createRoom = async (req, res) => {
    try {
        const roomId = await generateRoomId();
        const newRoom = await Room.create({
            ...req.body,
            id: roomId
        });
        res.status(201).json({
            status: "success",
            data: newRoom
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

// UPDATE room
exports.updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRoom = await Room.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!updatedRoom) {
            return res.status(404).json({
                status: "fail",
                message: "Room not found"
            });
        }
        
        res.status(200).json({
            status: "success",
            data: updatedRoom
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

// DELETE room
exports.deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoom = await Room.findByIdAndDelete(id);
        
        if (!deletedRoom) {
            return res.status(404).json({
                status: "fail",
                message: "Room not found"
            });
        }
        
        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};