import React from "react";
import socketio from 'socket.io-client'
import {host} from '../utils/APIRoutes'

export const socket = socketio(host)

export const SocketContext = React.createContext(socket)

