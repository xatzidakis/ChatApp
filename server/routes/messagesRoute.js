const { addMessage, getAllMessage, getUnreadNum, clearUnread } = require('../controllers/messagesController');


const router = require('express').Router();

router.post('/addmsg', addMessage)
router.post('/getmsg', getAllMessage)
router.post('/getUnread', getUnreadNum)
router.post('/clearUnread', clearUnread)

module.exports = router;

