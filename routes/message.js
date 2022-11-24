const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController');

// routes to create message
router.get('/message/create', messageController.message_create_get);
router.post('/message/create', messageController.message_create_post);

// routes to update message
router.get('/message/:id/update', messageController.message_update_get);
router.post('/message/:id/update', messageController.message_update_post);

// routes to delete message
router.get('/message/:id/delete', messageController.message_delete_get);
router.post('/message/:id/delete', messageController.message_delete_post);

// routes to display a single message
router.get('/message/:id', messageController.message_detail);

module.exports = router;