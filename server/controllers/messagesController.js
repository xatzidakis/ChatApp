const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: {text: message},
            users: [from, to],
            sender: from,
        });
        if(data) return res.json({msg: 'Message added Successfully.'})
        return res.json({msg: 'Failed to add message to database.'})
    } catch (error) {
        next(error)
    }
}

module.exports.getAllMessage = async (req, res, next) => {
    try {
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            }
        }).sort({ updatedAt: 1})
        const projectMessages = messages.map(msg => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        res.json(projectMessages)
    } catch (error) {
        next(error)
    }
}

module.exports.getUnreadNum = async (req, res, next) => {
    try {
        const {from, to} = req.body;
        // console.log('currentUser id:', to)
        // console.log('sender id:', from)
        const unreadNum = await messageModel.find({
            sender: { $ne: to},
            users: {$all: [from, to]},
            isRead: false
        }).count()
        // console.log('unreadNum:', unreadNum)
        res.json(unreadNum)
    } catch (error) {
        next(error)
    }
}

module.exports.clearUnread = async (req, res, next) => {
 try {
    // console.log('called clearUnread controller')
    const {from, to} = req.body;
    await messageModel.updateMany({
        sender: {$ne: to},
        users: {$all: [from, to]},
        isRead: false
    }, {$set: {isRead: true}})
    res.end()
 } catch (error) {
    console.log('error in clearUnread', error);
    next(error)   
 }   
}