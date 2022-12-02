const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const messageRoute = require('./routes/messagesRoute')

const app = express();
const socket = require('socket.io');
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoute)


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('db connected successfully')
}).catch((err) => {
    console.log("error on db:", err)
})


const server = app.listen(process.env.PORT, () => {
    console.log('Server started on port', process.env.PORT)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
})

const onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket
    socket.on('user-connected', userId => {
        onlineUsers.set(userId, socket.id)
        // console.log('onlineUsers:', onlineUsers)
    })

    socket.on('send-msg', data => {
        const sendUserSocket = onlineUsers.get(data.to)
        // console.log('on send-msg in server:', socket.id, data)
        // if(sendUserSocket) {
            // socket.broadcast.emit('msg-receive', data)
            socket.to(sendUserSocket).emit('msg-receive', data)
        // }
    })

    socket.on('testing', data => {
        // console.log('Test socket fired with data:', data)
        // socket.broadcast.emit('testing-back', 'lala from index.js')
    })
})