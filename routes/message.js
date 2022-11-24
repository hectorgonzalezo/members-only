const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController');

// routes to create message
router.get('/create', messageController.message_create_get);
router.post('/create', messageController.message_create_post);

// routes to delete message
router.get('/:id/delete', messageController.message_delete_get);
router.post('/:id/delete', messageController.message_delete_post);

// routes to display a single message
router.get('/:id', messageController.message_detail);

module.exports = router;