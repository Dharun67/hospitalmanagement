const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController');

router.get('/', roomController.getAllRooms);
router.get('/type/:type', roomController.getRoomsByType);
router.post('/room', roomController.createRoom);
router.put('/room/:id', roomController.updateRoom);
router.delete('/room/:id', roomController.deleteRoom);

module.exports = router;