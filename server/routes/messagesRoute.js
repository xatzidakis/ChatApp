const { addMessage, getAllMessage, getUnreadNum } = require('../controllers/messagesController');


const router = require('express').Router();

router.post('/addmsg', addMessage)
router.post('/getmsg', getAllMessage)
router.post('/getUnread', getUnreadNum)

module.exports = router;

