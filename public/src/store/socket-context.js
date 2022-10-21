import React from "react";
import {io} from 'socket.io-client'
import {host} from '../utils/APIRoutes'

const socket = io(host)

const SocketContext = React.createContext(socket)

export default SocketContext;