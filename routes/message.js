const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController');

// routes to create message
router.get('/create', messageController.message_create_get);
router.post('/create', messageController.message_create_post);

// routes to delete message
router.post('/delete/:id', messageController.message_delete);

module.exports = router;